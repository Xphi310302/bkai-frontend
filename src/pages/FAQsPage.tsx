// src/pages/FAQsPage.tsx
import React, { useEffect, useState } from "react";
import { getFAQsByFileId, modifyFAQ, insertFAQ, deleteFAQ } from "../services/faqs/api";
import type { FAQ } from "../components/FAQsPage/types"; 
import FAQItem from "../components/FAQsPage/FAQItem"; 
import { getFileByIdService } from "../services/files/fileReadService";
import { v4 as uuidv4 } from 'uuid';
import ConfirmationModal from "../components/FAQsPage/ConfirmationModal";

interface DocumentComponentProps {
  fileName: string;
  faqs: FAQ[];
  onUpdateAll: () => void;
  onRemoveFAQ: (faqId: string) => void;
  onAddFAQ: () => void;
  onVerifyFAQ: (faqId: string, isVerified: boolean) => void;
  onSelectAll: () => void;
}

const DocumentComponent: React.FC<DocumentComponentProps> = ({ 
  fileName, 
  faqs, 
  onUpdateAll,
  onRemoveFAQ,
  onAddFAQ,
  onVerifyFAQ
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [modalCallback, setModalCallback] = useState<() => void>(() => {});

  const handleConfirmAction = () => {
    modalCallback();
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 w-full max-w-full mx-auto border border-green-300">
      <div className="sticky top-0 bg-white p-6 border-b border-green-300 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-green-800">{fileName}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setShowModal(true);
                setModalTitle("Xác nhận cập nhật");
                setModalMessage("Bạn có chắc chắn muốn cập nhật tất cả FAQ không?");
                setModalAction("update-all");
                setModalCallback(() => onUpdateAll);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Cập nhật tất cả</span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.faq_id}
            faq={faq}
            onRemove={onRemoveFAQ}
            onVerifyChange={onVerifyFAQ}
            setShowModal={setShowModal}
            setModalTitle={setModalTitle}
            setModalMessage={setModalMessage}
            setModalAction={setModalAction}
            setModalCallback={setModalCallback}
          />
        ))}
      </div>
      <div className="flex justify-end p-6 border-t border-green-300">
        <button
          onClick={onAddFAQ}
          className="w-12 h-12 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
          title="Thêm FAQ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <ConfirmationModal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        action={modalAction}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

const FAQsPage: React.FC = () => {
  const [documents, setDocuments] = useState<{ [key: string]: FAQ[] }>({});
  const [fileDetails, setFileDetails] = useState<{ fileName: string } | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const fileId = searchParams.get('fileId');

  useEffect(() => {
    if (fileId) {
      const fetchFileDetails = async () => {
        try {
          const details = await getFileByIdService(fileId);
          if (details) {
            setFileDetails({ fileName: details.fileName });
            document.title = `FAQs - ${details.fileName}`;
          }
        } catch (error) {
          console.error("Error fetching file details:", error);
        }
      };

      const fetchFAQs = async () => {
        try {
          const documentFaqs = await getFAQsByFileId(fileId);
          setDocuments(prev => ({
            ...prev,
            [fileId]: documentFaqs
          }));
        } catch (error) {
          console.error("Error fetching FAQs:", error);
        }
      };

      fetchFileDetails();
      fetchFAQs();
    }
  }, [fileId]);

  const handleUpdateAll = async (fileId: string) => {
    const faqs = documents[fileId];
    if (!faqs) return;

    try {
      await Promise.all(
        faqs.map(async (faq) => {
          const updatedFaq = { ...faq, is_source: true };
          if (faq.faq_id.startsWith('new-')) {
            await insertFAQ(updatedFaq);
          } else {
            await modifyFAQ(updatedFaq);
          }
        })
      );

      const updatedFaqs = await getFAQsByFileId(fileId);
      setDocuments(prev => ({
        ...prev,
        [fileId]: updatedFaqs
      }));
    } catch (error) {
      console.error('Error updating FAQs:', error);
    }
  };

  const handleVerifyFAQ = async (fileId: string, faqId: string, isVerified: boolean) => {
    try {
      const faq = documents[fileId]?.find(f => f.faq_id === faqId);
      if (!faq) return;

      const updatedFaq = { ...faq, is_source: isVerified };
      
      if (faq.faq_id.startsWith('new-')) {
        await insertFAQ(updatedFaq);
      } else {
        await modifyFAQ(updatedFaq);
      }

      const updatedFaqs = await getFAQsByFileId(fileId);
      setDocuments(prev => ({
        ...prev,
        [fileId]: updatedFaqs
      }));
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleRemoveFAQ = async (fileId: string, faqId: string) => {
    try {
      await deleteFAQ(faqId);
      const updatedFaqs = await getFAQsByFileId(fileId);
      setDocuments(prev => ({
        ...prev,
        [fileId]: updatedFaqs
      }));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleAddFAQ = async (fileId: string) => {
    const newFAQ: FAQ = {
      faq_id: uuidv4(),
      file_id: fileId,
      question: '',
      answer: '',
      is_source: false,
      created: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }),
      modified: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }),
      deleted: false
    };

    try {
      await insertFAQ(newFAQ);
      const updatedFaqs = await getFAQsByFileId(fileId);
      setDocuments(prev => ({
        ...prev,
        [fileId]: updatedFaqs
      }));
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const handleSelectAll = async (fileId: string) => {
    try {
      const faqs = documents[fileId];
      if (!faqs) return;

      await Promise.all(
        faqs.map(async (faq) => {
          const updatedFaq = { ...faq, is_source: true };
          if (faq.faq_id.startsWith('new-')) {
            await insertFAQ(updatedFaq);
          } else {
            await modifyFAQ(updatedFaq);
          }
        })
      );

      const updatedFaqs = await getFAQsByFileId(fileId);
      setDocuments(prev => ({
        ...prev,
        [fileId]: updatedFaqs
      }));
    } catch (error) {
      console.error('Error selecting all FAQs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <div className="container mx-auto px-4 py-8 max-w-screen-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-green-800 mb-3">
            CÂU HỎI THƯỜNG GẶP
          </h1>
          {fileDetails && (
            <p className="text-xl text-green-600">
              {`Các câu hỏi thường gặp về `}
              <strong>{fileDetails.fileName.replace('.pdf', '')}</strong>
            </p>
          )}
        </div>
        <div className="space-y-6">
          {Object.entries(documents).map(([docFileId, faqs]) => (
            <DocumentComponent
              key={docFileId}
              fileName={fileDetails?.fileName || docFileId}
              faqs={faqs}
              onUpdateAll={() => handleUpdateAll(docFileId)}
              onRemoveFAQ={(faqId) => handleRemoveFAQ(docFileId, faqId)}
              onAddFAQ={() => handleAddFAQ(docFileId)}
              onVerifyFAQ={(faqId, isVerified) => handleVerifyFAQ(docFileId, faqId, isVerified)}
              onSelectAll={() => handleSelectAll(docFileId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
