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
    <div id="faqs-page">
      <div className="faq-header">
        <span className="faq-badge">GOT A QUESTION?</span>
        <h1 className="faq-title">New FAQs</h1>
        <button className="import-btn" onClick={toggleDocumentSelector}>
          Import FAQs
        </button>
      </div>
      <div className="documents-container">
        {Array.from(faqs.keys()).map((docId) => {
          const documentFAQs = faqs.get(docId) || [];
          return (
            <div className="faq-document" key={docId} data-document-id={docId}>
              <h2 className="document-title">
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

export default FAQsPage;
