import React, { useEffect, useState } from "react";
import { getFAQsByDocument, getDocuments } from "../services/faqs/api";
import type { FAQ, Document } from "../components/FAQsPage/types"; // Ensure Document is imported correctly
import FAQItem from "../components/FAQsPage/FAQItem"; // Importing FAQItem
import DocumentSelector from "../components/FAQsPage/DocumentSelector"; // Importing DocumentSelector

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [documents, setDocuments] = useState<Document[]>([]); // Ensure this is Document[]
  const [isDocumentSelectorVisible, setDocumentSelectorVisible] =
    useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDocumentImport = async (fileName: string) => {
    setLoading(true);
    try {
      const documentFaqs = await getFAQsByDocument(fileName); // Fetch FAQs using the filename
      setFaqs((prev) => new Map(prev).set(fileName, documentFaqs)); // Store FAQs in state
      setDocumentSelectorVisible(false); // Close the DocumentSelector
    } catch (error) {
      console.error("Không thể nhập câu hỏi thường gặp:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const uploadedFiles: UploadedFile[] = await getDocuments(); // Fetch UploadedFile[]

        // Transform UploadedFile[] to Document[]
        const docs: Document[] = uploadedFiles.map((file) => ({
          id: file.id, // Ensure these properties exist in UploadedFile
          name: file.file_name, // Adjust according to your UploadedFile structure
          url: file.url, // Adjust according to your UploadedFile structure
          // Add any other necessary properties to match Document type
        }));

        setDocuments(docs); // Set transformed documents
      } catch (error) {
        console.error("Không thể tải tài liệu:", error);
      }
    };
    init();
  }, []);

  const toggleDocumentSelector = () => {
    setDocumentSelectorVisible((prev) => !prev);
  };

  const handleSaveFAQ = (updatedFAQ: FAQ) => {
    setFaqs((prev) => {
      const updatedFAQs = prev.get(updatedFAQ.file_id) || [];
      const index = updatedFAQs.findIndex(
        (faq) => faq.faq_id === updatedFAQ.faq_id
      );
      if (index !== -1) {
        updatedFAQs[index] = updatedFAQ;
      }
      return new Map(prev).set(updatedFAQ.file_id, updatedFAQs);
    });
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
                <FAQItem key={faq.faq_id} faq={faq} onSave={handleSaveFAQ} />
              ))}
            </div>
          );
        })}
      </div>

      {isDocumentSelectorVisible && (
        <DocumentSelector
          documents={documents}
          onImport={handleDocumentImport}
          onClose={toggleDocumentSelector}
          isVisible={isDocumentSelectorVisible} // This line is now valid
        />
      )}
    </div>
  );
};

export default FAQsPage;
