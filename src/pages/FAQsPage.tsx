// src/pages/FAQsPage.tsx
import React, { useEffect, useState } from "react";
import { getFAQsByFileId } from "../services/faqs/api";
import type { FAQ } from "../components/FAQsPage/types"; 
import FAQItem from "../components/FAQsPage/FAQItem"; 
import { getFileByIdService } from "../services/files/fileReadService";
import { v4 as uuidv4 } from 'uuid';

const DocumentComponent: React.FC<{ 
  fileName: string; 
  faqs: FAQ[]; 
  onUpdateAll: () => void;
  onRemoveFAQ: (faqId: string) => void;
  onAddFAQ: () => void;
}> = ({ 
  fileName, 
  faqs, 
  onRemoveFAQ,
  onAddFAQ
}) => (
  <div className="bg-white rounded-lg shadow-sm mb-6">
    <div className="sticky top-0 bg-white p-4 border-b z-10 rounded-t-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{fileName}</h2>
      </div>
    </div>
    <div className="p-6 space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.faq_id}
          className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <FAQItem
            faq={faq}
            onRemove={onRemoveFAQ}
          />
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <button
          className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md transition-all duration-200 flex items-center justify-center w-12 h-12"
          onClick={onAddFAQ}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const searchParams = new URLSearchParams(window.location.search);
  const fileId = searchParams.get('fileId');

  useEffect(() => {
    if (fileId) {
      const fetchFileDetails = async () => {
        try {
          const fileDetails = await getFileByIdService(fileId);
          if (fileDetails) {
            setFileName(fileDetails.fileName);
            document.title = `FAQs - ${fileDetails.fileName}`;
          }
        } catch (error) {
          console.error("Error fetching file details:", error);
        }
      };

      const fetchFAQs = async () => {
        setLoading(true);
        setError(null);
        try {
          const documentFaqs = await getFAQsByFileId(fileId);
          setFaqs(new Map().set(fileId, documentFaqs));
        } catch (error) {
          console.error("Error fetching FAQs:", error);
          setError("Failed to fetch FAQs. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchFileDetails();
      fetchFAQs();
    }

    return () => {
      document.title = 'FAQs';
    };
  }, [fileId]);

  const handleUpdateAll = async () => {
    if (!fileId) return;
    // TODO: Implement the API call to update all FAQs
    console.log("Updating all FAQs for file:", fileId);
  };

  const handleRemoveFAQ = (faqId: string) => {
    if (!fileId) return;
    
    setFaqs((prev) => {
      const updatedFAQs = new Map(prev);
      const documentFAQs = updatedFAQs.get(fileId) || [];
      updatedFAQs.set(
        fileId,
        documentFAQs.filter((faq) => faq.faq_id !== faqId)
      );
      return updatedFAQs;
    });
  };

  const handleAddFAQ = () => {
    if (!fileId) return; 
    const newFAQ = { faq_id: uuidv4(), file_id: fileId, question: '', answer: '', verify: false };
    setFaqs((prev) => {
      const updatedFAQs = new Map(prev);
      const documentFAQs = updatedFAQs.get(fileId) || [];
      updatedFAQs.set(fileId, [...documentFAQs, newFAQ]);
      return updatedFAQs;
    });
  };

  const renderFAQsForFileId = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      );
    }

    if (!fileId || !faqs.has(fileId)) {
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-yellow-700">No FAQs found for this file.</p>
            </div>
          </div>
        </div>
      );
    }

    const documentFAQs = faqs.get(fileId) || [];
    
    return (
      <div>
        <DocumentComponent
          fileName={fileName}
          faqs={documentFAQs}
          onUpdateAll={handleUpdateAll}
          onRemoveFAQ={handleRemoveFAQ}
          onAddFAQ={() => handleAddFAQ()}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-800 mb-6">
            CÂU HỎI THƯỜNG GẶP
          </h1>
          <div className="h-1 w-32 bg-green-600 mx-auto rounded-full"></div>
        </div>
        {renderFAQsForFileId()}
      </div>
    </div>
  );
};

export default FAQsPage;
