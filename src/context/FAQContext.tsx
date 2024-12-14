import React, { createContext, useContext, useState, useCallback } from 'react';
import type { FAQ } from '../components/FAQsPage/types';
import { modifyFAQ, getFAQsByFileId, updateFAQStatus } from '../services/faqs/api';

interface FAQContextType {
  faqs: { [key: string]: FAQ[] };
  setFAQs: React.Dispatch<React.SetStateAction<{ [key: string]: FAQ[] }>>;
  updateFAQ: (fileId: string, updatedFaq: FAQ) => Promise<void>;
  verifyFAQ: (fileId: string, faqId: string, isVerified: boolean) => Promise<void>;
  updateAllFAQs: (fileId: string) => Promise<void>;
  refreshFAQs: (fileId: string) => Promise<void>;
}

const FAQContext = createContext<FAQContextType | undefined>(undefined);

export const useFAQ = () => {
  const context = useContext(FAQContext);
  if (!context) {
    throw new Error('useFAQ must be used within a FAQProvider');
  }
  return context;
};

export const FAQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [faqs, setFAQs] = useState<{ [key: string]: FAQ[] }>({});

  const refreshFAQs = useCallback(async (fileId: string) => {
    try {
      const documentFaqs = await getFAQsByFileId(fileId);
      setFAQs(prev => ({
        ...prev,
        [fileId]: documentFaqs
      }));
    } catch (error) {
      console.error("Error refreshing FAQs:", error);
    }
  }, []);

  const updateFAQ = useCallback(async (fileId: string, updatedFaq: FAQ) => {
    try {
      await modifyFAQ(updatedFaq);
      await refreshFAQs(fileId);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      throw error;
    }
  }, [refreshFAQs]);

  const verifyFAQ = useCallback(async (fileId: string, faqId: string, isVerified: boolean) => {
    try {
      if (isVerified) {
        await updateFAQStatus([faqId]);
      } else {
        const faq = faqs[fileId]?.find(f => f.faq_id === faqId);
        if (!faq) return;
        const updatedFaq = { ...faq, is_source: false };
        await modifyFAQ(updatedFaq);
      }
      await refreshFAQs(fileId);
    } catch (error) {
      console.error("Error verifying FAQ:", error);
      throw error;
    }
  }, [faqs, refreshFAQs]);

  const updateAllFAQs = useCallback(async (fileId: string) => {
    try {
      // 1. Filter FAQs where is_source is false
      const unverifiedFaqs = faqs[fileId]?.filter(faq => !faq.is_source) || [];
      
      if (unverifiedFaqs.length === 0) {
        console.log("No unverified FAQs to update");
        return;
      }

      // 2. Update all unverified FAQs at once
      const faqIds = unverifiedFaqs.map(faq => faq.faq_id);
      await updateFAQStatus(faqIds);

      // 3. Refresh FAQs to update UI state
      await refreshFAQs(fileId);
    } catch (error) {
      console.error("Error updating all FAQs:", error);
      throw error;
    }
  }, [faqs, refreshFAQs]);

  return (
    <FAQContext.Provider value={{
      faqs,
      setFAQs,
      updateFAQ,
      verifyFAQ,
      updateAllFAQs,
      refreshFAQs
    }}>
      {children}
    </FAQContext.Provider>
  );
};
