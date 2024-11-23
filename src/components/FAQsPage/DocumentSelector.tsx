import React, { useState } from "react";

type Document = {
  id: string;
  name: string;
  url: string;
};

type DocumentSelectorProps = {
  documents: Document[];
  onImport: (documentId: string) => void;
  onClose: () => void;
};

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documents,
  onImport,
  onClose,
}) => {
  const [isLoading, setLoading] = useState(false);

  const handleDocumentClick = async (url: string) => {
    console.log("Selected document URL:", url);
    setLoading(true);
    await onImport(url);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          Chọn Tài Liệu Để Nhập Câu Hỏi Thường Gặp
        </h2>
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-lg text-green-700">Đang tải...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map(({ id, name, url }) => (
              <div
                key={id}
                className="p-4 rounded-md border border-green-200 flex justify-between items-center cursor-pointer"
                onClick={() => handleDocumentClick(url)}
              >
                <span className="text-green-800 font-medium">{name}</span>
              </div>
            ))}
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
