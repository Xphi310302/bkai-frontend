import React, { useEffect, useState } from "react";
import { getFAQsByDocument, getDocuments } from "../services/faqs/api";
import type { FAQ, Document } from "../components/FAQsPage/types"; // Import Document type
import { UploadedFile } from "../components/UploadPage/FileTable"; // Import UploadedFile
import FAQItem from "../components/FAQsPage/FAQItem"; // Importing FAQItem
import DocumentSelector from "../components/FAQsPage/DocumentSelector"; // Importing DocumentSelector

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDocumentSelectorVisible, setDocumentSelectorVisible] =
    useState(false);
  const [isLoading, setLoading] = useState(false);

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
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                {fileName}
              </h2>
              {documentFAQs.map((faq) => (
                <div
                  className="flex justify-between items-center mb-4 p-2 bg-white rounded shadow border border-green-400 w-full" // Added w-full to take full width
                  key={faq.faq_id}
                >
                  <FAQItem
                    faq={faq}
                    onVerifyChange={(faqId) =>
                      handleVerifyChange(fileName, faqId)
                    }
                  />{" "}
                  {/* Pass onVerifyChange */}
                </div>
              ))}
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleCheckAll(fileName)} // Call handleCheckAll
              >
                Check All
              </button>
            </div>
          );
        })}
      </div>

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
