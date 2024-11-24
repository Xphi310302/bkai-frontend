// src/components/FAQsPage/DocumentSelector.tsx
import React, { useState } from "react";
import { Document } from "./types";

interface DocumentSelectorProps {
  documents: Document[];
  onImport: (documentURL: string) => Promise<void>;
  onClose: () => void;
  isVisible: boolean; // Added isVisible prop
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documents,
  onImport,
  onClose,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term

  const handleDocumentClick = async (fileName: string) => {
    console.log("Selected document URL:", fileName);
    setLoading(true);
    await onImport(fileName);
    setLoading(false);
  };

  // Filter documents based on search term
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          Chọn Tài Liệu Để Nhập Câu Hỏi Thường Gặp
        </h2>

        {/* Search bar added here */}
        <input
          type="text"
          placeholder="Tìm kiếm tài liệu..."
          className="border border-green-200 p-2 rounded w-full mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
        />

        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-lg text-green-700">Đang tải...</p>
          </div>
        ) : (
          <div className="max-h-60 overflow-y-auto">
            {" "}
            {/* Added scrollable container */}
            {filteredDocuments.length > 0 ? ( // Check if there are filtered documents
              <div className="space-y-4">
                {filteredDocuments.map(({ id, name }) => (
                  <div
                    key={id}
                    className="p-4 rounded-md border border-green-200 flex justify-between items-center cursor-pointer"
                    onClick={() => handleDocumentClick(name)}
                  >
                    <span className="text-green-800 font-medium">{name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                {" "}
                {/* Placeholder when no documents */}
                <p>Không có tài liệu nào để hiển thị.</p>
              </div>
            )}
          </div>
        )}
        <div className="mt-4 text-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentSelector;
