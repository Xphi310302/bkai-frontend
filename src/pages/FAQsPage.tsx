// src/pages/FAQsPage.tsx
import React, { useEffect, useState } from "react";
import { getFAQsByFileId } from "../services/faqs/api";
import type { FAQ } from "../components/FAQsPage/types"; 
import FAQItem from "../components/FAQsPage/FAQItem"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFileByIdService } from "../services/files/fileReadService";

const DocumentComponent: React.FC<{ 
  fileName: string; 
  faqs: FAQ[]; 
  onCheckAll: () => void; 
  onVerifyAll: () => void; 
  onRemove: () => void; 
  onVerifyChange: (faqId: string) => void; 
}> = ({ 
  fileName, 
  faqs, 
  onCheckAll, 
  onVerifyAll, 
  onRemove, 
  onVerifyChange 
}) => (
  <div
    className="bg-green-50 p-6 mb-10 rounded-lg shadow-lg border-2 border-green-300"
    key={fileName}
    data-document-id={fileName}
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-green-700">
        {fileName}
      </h2>
      <div>
        <button
          className="mt-0 bg-green-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-green-700 hover:scale-105"
          onClick={onCheckAll}
        >
          Chọn tất cả
        </button>
        <button
          className="mt-0 bg-blue-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 ml-2"
          onClick={onVerifyAll}
        >
          Cập nhật dữ liệu
        </button>
        <button
          className="mt-0 bg-red-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-red-700 hover:scale-105 ml-2"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
        </button>
      </div>
    </div>
    {faqs.map((faq) => (
      <div
        className="flex justify-between items-center mb-4 p-2 bg-white rounded shadow border border-green-400 w-full"
        key={faq.faq_id}
      >
        <FAQItem
          faq={faq}
          onVerifyChange={onVerifyChange}
        />
      </div>
    ))}
  </div>
);

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Get fileId from URL search params
  const searchParams = new URLSearchParams(window.location.search);
  const fileId = searchParams.get('fileId');

  useEffect(() => {
    if (fileId) {
      const fetchFileDetails = async () => {
        try {
          const fileDetails = await getFileByIdService(fileId);
          if (fileDetails) {
            setFileName(fileDetails.fileName);
            // Set the document title to include the file name
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
          console.log("Fetching FAQs for fileId:", fileId);
          const documentFaqs = await getFAQsByFileId(fileId);
          console.log("Received FAQs:", documentFaqs);
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

    // Cleanup function to reset the title when component unmounts
    return () => {
      document.title = 'FAQs';
    };
  }, [fileId]);

  const handleCheckAll = (fileName: string) => {
    setFaqs((prev) => {
      const updatedFAQs = (prev.get(fileName) || []).map((faq) => ({
        ...faq,
        verify: true, // Set verify to true for all
      }));
      return new Map(prev).set(fileName, updatedFAQs);
    });
  };

  const handleVerifyChange = (fileName: string, faqId: string) => {
    setFaqs((prev) => {
      const updatedFAQs = (prev.get(fileName) || []).map((faq) =>
        faq.faq_id === faqId ? { ...faq, verify: !faq.verify } : faq
      );
      return new Map(prev).set(fileName, updatedFAQs);
    });
  };

  const handleVerifyAll = async (fileName: string) => {
    // Simulate updating to the database
    await updateFAQsToDatabase(fileName); // Assume this function updates the FAQs in the database
  };

  //dummy update function
  const updateFAQsToDatabase = async (fileName: string) => {
    // Simulate an API call to update FAQs in the database
    console.log(`Updating FAQs for document: ${fileName}`); // Log the action for clarity
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful update
        const success = true; // Change this to false to simulate an error
        if (success) {
          resolve("Update successful");
        } else {
          reject(new Error("Update failed")); // Simulate an error
        }
      }, 1000);
    });
  };

  const handleRemoveDocument = (fileName: string) => {
    setFaqs((prev) => {
      const updatedFAQs = new Map(prev);
      updatedFAQs.delete(fileName); // Remove the document from the state
      return updatedFAQs;
    });
  };

  const renderFAQsForFileId = () => {
    if (isLoading) {
      return <div className="text-center py-4 text-green-700">Loading FAQs...</div>;
    }

    if (error) {
      return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    if (!fileId || !faqs.has(fileId)) {
      return <div className="text-center py-4 text-green-700">No FAQs found for this file.</div>;
    }

    const documentFAQs = faqs.get(fileId) || [];
    
    return (
      <div className="px-8">
        <DocumentComponent
          fileName={fileName}
          faqs={documentFAQs}
          onCheckAll={() => handleCheckAll(fileId)}
          onVerifyAll={() => handleVerifyAll(fileId)}
          onRemove={() => handleRemoveDocument(fileId)}
          onVerifyChange={(faqId) => handleVerifyChange(fileId, faqId)}
        />
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen font-sans">
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-green-800 mb-6">
          {'CÂU HỎI THƯỜNG GẶP'}
        </h1>
      </div>
      <div className="container mx-auto px-4">
        {renderFAQsForFileId()}
      </div>
    </div>
  );
};

export default FAQsPage;
