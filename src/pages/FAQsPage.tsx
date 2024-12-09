// src/pages/FAQsPage.tsx
import React, { useEffect, useState } from "react";
import { getFAQsByFileId } from "../services/faqs/api";
import type { FAQ } from "../components/FAQsPage/types"; 
import FAQItem from "../components/FAQsPage/FAQItem"; 
import { getFileByIdService } from "../services/files/fileReadService";
import { v4 as uuidv4 } from 'uuid';
import ConfirmationModal from "../components/FAQsPage/ConfirmationModal";

const DocumentComponent: React.FC<{ 
  fileName: string; 
  faqs: FAQ[]; 
  onUpdateAll: () => void;
  onRemoveFAQ: (faqId: string) => void;
  onAddFAQ: () => void;
  onVerifyFAQ: (faqId: string, isVerified: boolean) => void;
  onSelectAll: () => void;
}> = ({ 
  fileName, 
  faqs, 
  onUpdateAll,
  onRemoveFAQ,
  onAddFAQ,
  onVerifyFAQ,
  onSelectAll
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 w-full max-w-full mx-auto border border-green-300">
      <div className="sticky top-0 bg-white p-6 border border-green-300 z-50 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-green-800">{fileName}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onSelectAll}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>Chọn tất cả</span>
            </button>
            <button 
              onClick={() => setShowConfirmModal(true)} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Cập nhật dữ liệu
            </button>
          </div>
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
              onVerifyChange={onVerifyFAQ}
            />
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button
            onClick={onAddFAQ}
            className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md transition-all duration-200 flex items-center justify-center w-12 h-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={onUpdateAll}
        title="Xác nhận cập nhật"
        message="Bạn có chắc chắn muốn cập nhật dữ liệu? Hành động này sẽ cập nhật tất cả các FAQ đã được xác nhận."
        confirmText="Cập nhật"
        cancelText="Hủy bỏ"
      />
    </div>
  );
};

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ fileId: string; fileName: string } | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const fileId = searchParams.get('fileId');

  useEffect(() => {
    if (fileId) {
      const fetchFileDetails = async () => {
        try {
          const fileDetails = await getFileByIdService(fileId);
          if (fileDetails) {
            setFileDetails({ fileId, fileName: fileDetails.fileName });
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
    if (!fileDetails) return;
    // TODO: Implement the API call to update all FAQs
    console.log("Updating all FAQs for file:", fileDetails.fileId);
  };

  const handleRemoveFAQ = (faqId: string) => {
    if (!fileDetails) return;
    
    setFaqs((prev) => {
      const updatedFAQs = new Map(prev);
      const documentFAQs = updatedFAQs.get(fileDetails.fileId) || [];
      updatedFAQs.set(
        fileDetails.fileId,
        documentFAQs.filter((faq) => faq.faq_id !== faqId)
      );
      return updatedFAQs;
    });
  };

  const handleAddFAQ = () => {
    if (!fileDetails) return; 
    const newFAQ = { faq_id: uuidv4(), file_id: fileDetails.fileId, question: '', answer: '', verify: false };
    setFaqs((prev) => {
      const updatedFAQs = new Map(prev);
      const documentFAQs = updatedFAQs.get(fileDetails.fileId) || [];
      updatedFAQs.set(fileDetails.fileId, [...documentFAQs, newFAQ]);
      return updatedFAQs;
    });
  };

  const handleVerifyFAQ = async (faqId: string, isVerified: boolean) => {
    try {
      // Here you would make an API call to update the verification status
      const updatedFaqs = new Map(faqs);
      if (fileDetails?.fileId) {
        const documentFaqs = updatedFaqs.get(fileDetails.fileId) || [];
        const updatedDocumentFaqs = documentFaqs.map(faq => 
          faq.faq_id === faqId ? { ...faq, is_source: isVerified } : faq
        );
        updatedFaqs.set(fileDetails.fileId, updatedDocumentFaqs);
        setFaqs(updatedFaqs);
      }
    } catch (error) {
      console.error("Error verifying FAQ:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleSelectAll = () => {
    if (!fileDetails?.fileId) return;
    
    setFaqs((prev) => {
      const updatedFaqs = new Map(prev);
      const documentFaqs = updatedFaqs.get(fileDetails.fileId) || [];
      const allVerified = documentFaqs.every(faq => faq.is_source);
      
      const updatedDocumentFaqs = documentFaqs.map(faq => ({
        ...faq,
        is_source: !allVerified
      }));
      
      updatedFaqs.set(fileDetails.fileId, updatedDocumentFaqs);
      return updatedFaqs;
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
            <strong>{fileDetails?.fileName.replace('.pdf', '')}</strong>
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          fileDetails && (
            <DocumentComponent
              fileName={fileDetails.fileName}
              faqs={faqs.get(fileDetails.fileId) || []}
              onUpdateAll={handleUpdateAll}
              onRemoveFAQ={handleRemoveFAQ}
              onAddFAQ={handleAddFAQ}
              onVerifyFAQ={handleVerifyFAQ}
              onSelectAll={handleSelectAll}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FAQsPage;
