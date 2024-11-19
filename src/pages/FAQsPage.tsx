import React, { useEffect, useState } from "react";
import { getFAQsByDocument, getDocuments } from "../services/faqs/api";
import type { FAQ, Document } from "../components/FAQsPage/types";

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Map<string, FAQ[]>>(new Map());
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDocumentSelectorVisible, setDocumentSelectorVisible] =
    useState(false);

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

  const toggleDocumentSelector = () => {
    setDocumentSelectorVisible(!isDocumentSelectorVisible);
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
          New FAQs
        </h1>
        <button
          className="bg-green-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-green-700 transition"
          onClick={toggleDocumentSelector}
        >
          Import FAQs
        </button>
      </div>
      <div className="px-8">
        {Array.from(faqs.keys()).map((docId) => {
          const documentFAQs = faqs.get(docId) || [];
          return (
            <div
              className="bg-green-50 p-6 mb-10 rounded-lg shadow-lg border-2 border-green-300"
              key={docId}
              data-document-id={docId}
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                {documents.find((d) => d.id === docId)?.name}
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
          importedFaqs={faqs}
          onImport={handleDocumentImport}
          onClose={toggleDocumentSelector}
        />
      )}
    </div>
  );
};

type FAQItemProps = {
  faq: FAQ;
  onSave: (updatedFAQ: FAQ) => void;
};

const FAQItem: React.FC<FAQItemProps> = ({ faq, onSave }) => {
  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(faq.answer);

  const toggleAnswerVisibility = () => {
    setAnswerVisible(!isAnswerVisible);
  };

  const toggleEditMode = () => {
    if (isEditing) {
      onSave({ ...faq, answer: editedAnswer });
    }
    setEditing(!isEditing);
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow border border-green-400">
      <div className="flex justify-between items-center">
        <span className="font-medium text-green-800">{faq.question}</span>
        <div className="flex items-center space-x-2">
          <button
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            onClick={toggleAnswerVisibility}
          >
            {isAnswerVisible ? "-" : "+"}
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={toggleEditMode}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      {isAnswerVisible && (
        <div className="mt-4">
          {isEditing ? (
            <textarea
              className="w-full p-2 border border-green-300 rounded"
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
          ) : (
            <p className="text-green-700">{faq.answer}</p>
          )}
        </div>
      )}
    </div>
  );
};

type DocumentSelectorProps = {
  documents: Document[];
  importedFaqs: Map<string, FAQ[]>;
  onImport: (documentId: string) => void;
  onClose: () => void;
};

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documents,
  importedFaqs,
  onImport,
  onClose,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
        Select Documents to Import FAQs
      </h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`p-4 rounded-md border ${
              importedFaqs.has(doc.id)
                ? "bg-green-100 border-green-300"
                : "border-green-200"
            } flex justify-between items-center`}
            onClick={() => onImport(doc.id)}
          >
            <span className="text-green-800 font-medium">{doc.name}</span>
            {importedFaqs.has(doc.id) && (
              <span className="text-green-600 font-bold">Imported</span>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default FAQsPage;
