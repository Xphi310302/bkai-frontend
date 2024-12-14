// src/pages/FAQsPage.tsx
import React, { useEffect, useState } from "react";
import type { FAQ } from "../components/FAQsPage/types"; 
import FAQItem from "../components/FAQsPage/FAQItem"; 
import { getFileByIdService } from "../services/files/fileReadService";
import { v4 as uuidv4 } from 'uuid';
import ConfirmationModal from "../components/ConfirmationModal";
import ProcessingModal from "../components/FAQsPage/ProcessingModal";
import { useFAQ } from "../context/FAQContext";
import { insertFAQ, deleteFAQ } from "../services/faqs/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface DocumentComponentProps {
  fileName: string;
  faqs: FAQ[];
  onUpdateAll: () => Promise<void>;
  onRemoveFAQ: (faqId: string) => void;
  onAddFAQ: () => void;
  onVerifyFAQ: (faqId: string, isVerified: boolean) => void;
}

const DocumentComponent: React.FC<DocumentComponentProps> = ({ 
  fileName, 
  faqs, 
  onUpdateAll,
  onRemoveFAQ,
  onAddFAQ,
  onVerifyFAQ,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [modalCallback, setModalCallback] = useState<() => void>(() => {});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmAction = async () => {
    if (modalAction === "update-all") {
      setShowModal(false);
      setIsProcessing(true);
      try {
        await onUpdateAll();
      } catch (error) {
        console.error('Error updating all FAQs:', error);
      } finally {
        setIsProcessing(false);
      }
    } else {
      modalCallback();
      setShowModal(false);
    }
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
              <span>Xác nhận tất cả</span>
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
      <ProcessingModal
        show={isProcessing}
        message="Đang xử lý cập nhật FAQ..."
      />
    </div>
  );
};

const FAQsPage: React.FC = () => {
  const navigate = useNavigate();
  const { faqs, updateAllFAQs, verifyFAQ, refreshFAQs } = useFAQ();
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

      fetchFileDetails();
      refreshFAQs(fileId);
    }
  }, [fileId, refreshFAQs]);

  const handleRemoveFAQ = async (fileId: string, faqId: string) => {
    try {
      await deleteFAQ(faqId);
      await refreshFAQs(fileId);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleAddFAQ = async (fileId: string) => {
    const newFAQ: FAQ = {
      faq_id: `${uuidv4()}`,
      file_id: fileId,
      question: '',
      answer: '',
      is_source: false,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      deleted: false
    };

    try {
      await insertFAQ(newFAQ);
      await refreshFAQs(fileId);
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <button
        onClick={() => navigate('/upload')}
        className="mb-6 flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 font-medium group"
      >
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" 
        />
        <span>Quay lại</span>
      </button>
      
      {fileDetails && (
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-green-800 mb-3">
            CÂU HỎI THƯỜNG GẶP
          </h1>
          <p className="text-xl text-green-600">
            {`Các câu hỏi thường gặp về `}
            <strong>{fileDetails.fileName.replace('.pdf', '')}</strong>
          </p>
        </div>
      )}
      <div className="space-y-6">
        {Object.entries(faqs).map(([docFileId, docFaqs]) => (
          <DocumentComponent
            key={docFileId}
            fileName={fileDetails?.fileName || docFileId}
            faqs={docFaqs}
            onUpdateAll={() => updateAllFAQs(docFileId)}
            onRemoveFAQ={(faqId) => handleRemoveFAQ(docFileId, faqId)}
            onAddFAQ={() => handleAddFAQ(docFileId)}
            onVerifyFAQ={(faqId, isVerified) => verifyFAQ(docFileId, faqId, isVerified)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;
