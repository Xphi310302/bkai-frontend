import React, { useEffect, useState } from "react";
import { getFAQsByDocument, getDocuments } from "../services/faqs/api";
import type { FAQ } from "../components/FAQsPage/types";
import FAQItem from "../components/FAQsPage/FAQItem"; // Importing FAQItem
import DocumentSelector from "../components/FAQsPage/DocumentSelector"; // Importing DocumentSelector

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [documents, setDocuments] = useState<any[]>([]);
  const [isDocumentSelectorVisible, setDocumentSelectorVisible] =
    useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDocumentImport = async (documentURL: string) => {
    setLoading(true);
    try {
      const documentFaqs = await getFAQsByDocument(documentURL);
      setFaqs((prev) => new Map(prev).set(documentURL, documentFaqs));
      setDocumentSelectorVisible(false);
    } catch (error) {
      console.error("Không thể nhập câu hỏi thường gặp:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const docs = await getDocuments();
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

  const handleSaveFAQ = (updatedFAQ: FAQ) => {
    setFaqs((prev) => {
      const updatedFAQs = prev.get(updatedFAQ.file_id) || [];
      const index = updatedFAQs.findIndex((faq) => faq.id === updatedFAQ.id);
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
        {Array.from(faqs.keys()).map((docId) => {
          const documentFAQs = faqs.get(docId) || [];
          const documentName = documents.find((d) => d.url === docId)?.name;
          return (
            <div
              className="bg-green-50 p-6 mb-10 rounded-lg shadow-lg border-2 border-green-300"
              key={docId}
              data-document-id={docId}
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                {documentName}
              </h2>
              {documentFAQs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} onSave={handleSaveFAQ} />
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
          isVisible={isDocumentSelectorVisible} // Added isVisible prop
        />
      )}
    </div>
  );
};

export default FAQsPage;
