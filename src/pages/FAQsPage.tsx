// src/pages/FAQsPage.tsx
import React, { useEffect, useState } from "react";
import { getFAQsByDocument, getDocuments } from "../services/faqs/api";
import type { FAQ, Document } from "../components/FAQsPage/types"; // Import Document type
import { UploadedFile } from "../components/UploadPage/FileTable"; // Import UploadedFile
import FAQItem from "../components/FAQsPage/FAQItem"; // Importing FAQItem
import DocumentSelector from "../components/FAQsPage/DocumentSelector"; // Importing DocumentSelector
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDocumentSelectorVisible, setDocumentSelectorVisible] =
    useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false); // New state for popup visibility

  const handleDocumentImport = async (fileName: string) => {
    setLoading(true);
    try {
      const documentFaqs = await getFAQsByDocument(fileName);
      setFaqs((prev) => new Map(prev).set(fileName, documentFaqs));
      setDocumentSelectorVisible(false);
    } catch (error) {
      console.error("Không thể nhập câu hỏi thường gặp:", error);
    } finally {
      setLoading(false);
    }
  };

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
    setPopupVisible(true); // Show the popup notification
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

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleRemoveDocument = (fileName: string) => {
    setFaqs((prev) => {
      const updatedFAQs = new Map(prev);
      updatedFAQs.delete(fileName); // Remove the document from the state
      return updatedFAQs;
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const uploadedFiles: UploadedFile[] = await getDocuments();
        const docs: Document[] = uploadedFiles.map((file) => ({
          id: file.fileId,
          name: file.name,
          url: file.url,
        }));
        setDocuments(docs);
      } catch (error) {
        console.error("Không thể tải tài liệu:", error);
      }
    };
    init();
  }, []);

  const toggleDocumentSelector = () => {
    setDocumentSelectorVisible((prev) => !prev);
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen font-sans">
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-green-800 mb-6">
          Tạo Câu Hỏi Thường Gặp Mới
        </h1>
        <button
          className="bg-green-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-green-700 transition"
          onClick={toggleDocumentSelector}
        >
          Nhập Câu Hỏi Thường Gặp
        </button>
      </div>
      {isLoading && (
        <div className="text-center py-4">
          <p className="text-lg text-green-700">
            Đang tải câu hỏi thường gặp...
          </p>
        </div>
      )}
      <div className="px-8">
        {Array.from(faqs.keys()).map((fileName) => {
          const documentFAQs = faqs.get(fileName) || [];
          return (
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
                    onClick={() => handleCheckAll(fileName)}
                  >
                    Chọn tất cả
                  </button>
                  <button
                    className="mt-0 bg-blue-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 ml-2"
                    onClick={() => handleVerifyAll(fileName)} // New button for verifying all
                  >
                    Cập nhật dữ liệu
                  </button>
                  <button
                    className="mt-0 bg-red-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out transform hover:bg-red-700 hover:scale-105 ml-2"
                    onClick={() => handleRemoveDocument(fileName)} // Remove button
                  >
                    <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                  </button>
                </div>
              </div>
              {documentFAQs.map((faq) => (
                <div
                  className="flex justify-between items-center mb-4 p-2 bg-white rounded shadow border border-green-400 w-full"
                  key={faq.faq_id}
                >
                  <FAQItem
                    faq={faq}
                    onVerifyChange={(faqId) =>
                      handleVerifyChange(fileName, faqId)
                    }
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg border-2 border-green-600">
            {" "}
            {/* Added border with main color theme */}
            <p className="text-lg text-green-700">
              Bộ câu hỏi đã được cập nhật!
            </p>
            <div className="flex justify-center">
              <button
                onClick={closePopup}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {isDocumentSelectorVisible && (
        <DocumentSelector
          documents={documents}
          onImport={handleDocumentImport}
          onClose={toggleDocumentSelector}
          isVisible={isDocumentSelectorVisible}
        />
      )}
    </div>
  );
};

export default FAQsPage;
