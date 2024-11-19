import React, { useEffect, useState } from "react";
import "./FAQsPage/styleFAQs.css";
import { getFAQsByDocument, getDocuments } from "./FAQsPage/api";
import type { FAQ, Document } from "../components/FAQsPage/types";
import FAQEditor from "../components/FAQsPage/FAQsEditor";
import DocumentSelector from "../components/FAQsPage/DocumentSelector";

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDocumentSelectorVisible, setDocumentSelectorVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const docs = await getDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error("Failed to load documents:", error);
      }
    };
    init();
  }, []);

  const handleDocumentImport = async (documentId: string) => {
    try {
      const documentFaqs = await getFAQsByDocument(documentId);
      setFaqs((prev) => new Map(prev).set(documentId, documentFaqs));
    } catch (error) {
      console.error("Failed to import FAQs:", error);
    }
  };

  const handleSaveFAQ = (updatedFAQ: FAQ) => {
    setFaqs((prev) => {
      const updatedFAQs = prev.get(updatedFAQ.documentId) || [];
      const index = updatedFAQs.findIndex((faq) => faq.id === updatedFAQ.id);
      if (index !== -1) {
        updatedFAQs[index] = updatedFAQ;
      }
      return new Map(prev).set(updatedFAQ.documentId, updatedFAQs);
    });
  };

  const toggleDocumentSelector = () => {
    setDocumentSelectorVisible(!isDocumentSelectorVisible);
  };

  return (
    <div id="faqs-page" className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <span className="bg-green-500 text-white py-2 px-4 rounded inline-block mb-4">
          GOT A QUESTION?
        </span>
        <h1 className="text-4xl mb-4 text-green-700">New FAQs</h1>
        <button className="bg-green-500 text-white border-none py-2 px-4 rounded cursor-pointer text-base transition duration-200 ease-in-out hover:bg-green-600">
          Import FAQs
        </button>
      </div>
      <div className="space-y-4">
        {Array.from(faqs.keys()).map((docId) => {
          const documentFAQs = faqs.get(docId) || [];
          return (
            <div
              className="bg-white rounded-lg mb-4 overflow-hidden border border-green-200 shadow-sm p-6"
              key={docId}
              data-document-id={docId}
            >
              <h2 className="text-2xl mb-4 text-green-700">
                {documents.find((d) => d.id === docId)?.name}
              </h2>
              {documentFAQs.map((faq) => (
                <FAQEditor key={faq.id} faq={faq} onSave={handleSaveFAQ} />
              ))}
            </div>
          );
        })}
      </div>
      <DocumentSelector
        documents={documents}
        onImport={handleDocumentImport}
        isVisible={isDocumentSelectorVisible}
        onClose={toggleDocumentSelector}
      />
    </div>
  );
};
