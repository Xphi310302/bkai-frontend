import React, { useState } from "react";
import FileUploader from "../components/UploadPage/FileUploader"; // Corrected the import path
import FileTable from "../components/UploadPage/FileTable"; // Updated the import path to match the context
import Pagination from "../components/UploadPage/Pagination"; // Updated the import path to match the context
import {
  handleFileUpload,
  handleDeleteFile,
} from "../components/UploadPage/handlers/fileHandlers"; // Updated import path

interface UploadedFile {
  name: string;
  url: string;
  dateUploaded: string;
}

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage) || 1; // Ensure at least 1 page

  const onFileUpload = (fileUrl: string, fileName: string) =>
    handleFileUpload(fileUrl, fileName, setUploadedFiles);
  const onDeleteFile = (url: string) => handleDeleteFile(url, setUploadedFiles);

  return (
    <div className="p-6 bg-gradient-to-b from-white to-green-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Quản lý dữ liệu
      </h1>

      {/* Search and File Uploader */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tệp tin"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-green-500"
        />
        <FileUploader onFileUpload={onFileUpload} />
      </div>

      {/* File Table */}
      <FileTable files={currentFiles} onDeleteFile={onDeleteFile} />

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UploadPage;
