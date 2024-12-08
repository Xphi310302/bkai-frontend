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
  onUpdateAll,
  onRemoveFAQ,
  onAddFAQ
}) => (
  <div className="bg-white rounded-lg shadow-sm mb-6 w-full max-w-full mx-auto border border-green-300">
    <div className="sticky top-0 bg-white p-6 border border-green-300 z-50 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-green-800">{fileName}</h2>
        </div>
        <button 
          onClick={onUpdateAll} 
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Cập nhật dữ liệu
        </button>
      </div>
    </div>
    <div className="p-6 space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.faq_id}
          className="bg-green-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 py-8">
      <div className="container mx-auto px-4 max-w-screen-2xl relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-green-800 mb-3">
            CÂU HỎI THƯỜNG GẶP
          </h1>
          <p className="text-xl text-green-600">
            {`Các câu hỏi thường gặp về `}
            <strong>{fileName.replace('.pdf', '')}</strong>
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          fileId && (
            <DocumentComponent
              fileName={fileName}
              faqs={faqs.get(fileId) || []}
              onUpdateAll={handleUpdateAll}
              onRemoveFAQ={handleRemoveFAQ}
              onAddFAQ={handleAddFAQ}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FAQsPage;
