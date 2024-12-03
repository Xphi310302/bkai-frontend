import React, { useState, useEffect } from "react";
import FileUploader from "../components/UploadPage/FileUploader";
import FileTable from "../components/UploadPage/FileTable";
import Pagination from "../components/UploadPage/Pagination";
import { UploadedFile } from "../components/UploadPage/types/files.ts";
import { deleteFileService } from "../services/files/fileDeleteService";
import { getFilesService } from "../services/files/fileReadService"; // Import the service

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  const fetchFiles = async () => {
    try {
      const files = await getFilesService();
      setUploadedFiles(files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []); // Empty dependency array to run only on mount

  const filteredFiles = uploadedFiles.filter((file) =>
    file && file.fileName ? file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage) || 1;

  const onFileUpload = (fileId: string, fileName: string, fileUrl: string, dateModified: string, isProcessing: boolean) => {
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      {
        fileId,
        fileName,
        fileUrl,
        dateModified,
        isProcessing
      },
    ]);
  };

  const onDeleteFile = async (fileId: string) => {
    try {
      await deleteFileService(fileId);
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.fileId !== fileId)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-green-50 to-green-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Quản lý dữ liệu
      </h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tệp tin"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-green-500"
        />
        <FileUploader onFileUpload={onFileUpload} onUploadComplete={fetchFiles} />
      </div>
      <FileTable files={currentFiles} onDeleteFile={onDeleteFile} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UploadPage;
