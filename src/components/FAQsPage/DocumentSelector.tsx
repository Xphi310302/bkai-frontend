import React, { useState } from "react";
import type { Document } from "./types";

interface DocumentSelectorProps {
  documents: Document[];
  onImport: (documentId: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documents,
  onImport,
  isVisible,
  onClose,
}) => {
  const [importedDocuments, setImportedDocuments] = useState<Set<string>>(
    new Set()
  );

  const addImportedDocument = (documentId: string) => {
    setImportedDocuments((prev) => new Set(prev).add(documentId));
  };

  const renderDocumentList = () => {
    return documents.map((doc) => (
      <div className="document-item" key={doc.id}>
        <button
          className={`document-select-btn ${
            importedDocuments.has(doc.id) ? "imported" : ""
          }`}
          data-document-id={doc.id}
          disabled={importedDocuments.has(doc.id)}
          onClick={() => {
            onImport(doc.id);
            addImportedDocument(doc.id);
          }}
        >
          {doc.name}
          {importedDocuments.has(doc.id) && (
            <span className="imported-badge">Imported</span>
          )}
        </button>
      </div>
    ));
  };

  return (
    <div
      className={`import-modal ${isVisible ? "visible" : ""}`}
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <div className="modal-content">
        <h2>Select Documents to Import FAQs</h2>
        <div className="document-list">{renderDocumentList()}</div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DocumentSelector;
