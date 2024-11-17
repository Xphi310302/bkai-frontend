import React, { useState } from "react";
import FileUploader from "../components/UploadPage/FileUploader";
import FileTable from "../components/UploadPage/FileTable";
import Pagination from "../components/UploadPage/Pagination";
import { UploadedFile } from "../components/UploadPage/FileTable";
import { deleteFileService } from "../services/files/fileDeleteService";

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage) || 1;

  const onFileUpload = (fileId: string, fileUrl: string, fileName: string) => {
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      {
        file_id: fileId,
        name: fileName,
        url: fileUrl,
        dateUploaded: new Date().toISOString(),
      },
    ]);
  };

  const onDeleteFile = async (fileId: string) => {
    try {
      await deleteFileService(fileId);
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.file_id !== fileId)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white to-green-100 min-h-screen">
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
        <FileUploader onFileUpload={onFileUpload} />
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
