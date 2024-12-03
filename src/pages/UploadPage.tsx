import React, { useEffect, useState } from "react";
import FileUploader from "../components/UploadPage/FileUploader";
import FileTable from "../components/UploadPage/FileTable";
import Pagination from "../components/UploadPage/Pagination";
import { UploadedFile } from "../components/UploadPage/types/files";
import { deleteFileService } from "../services/files/fileDeleteService";
import { getFilesService } from "../services/files/fileReadService";

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [currentFiles, setCurrentFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const filesPerPage = 10;

  const fetchFiles = async () => {
    try {
      const response = await getFilesService();
      // Sort files alphabetically by fileName
      const sortedFiles = response.sort((a, b) => 
        a.fileName.localeCompare(b.fileName)
      );
      setUploadedFiles(sortedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    // Filter and sort files based on search query
    const filteredFiles = uploadedFiles.filter((file) =>
      file && file.fileName ? file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) : false
    );

    // Paginate the filtered files
    const startIndex = (currentPage - 1) * filesPerPage;
    const endIndex = startIndex + filesPerPage;
    setCurrentFiles(filteredFiles.slice(startIndex, endIndex));
  }, [uploadedFiles, searchQuery, currentPage]);

  const onDeleteFile = async (fileId: string) => {
    try {
      await deleteFileService(fileId);
      await fetchFiles(); // Refresh the file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
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
        <FileUploader 
          onUploadComplete={fetchFiles} 
          existingFiles={uploadedFiles} 
        />
      </div>
      <FileTable files={currentFiles} onDeleteFile={onDeleteFile} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(uploadedFiles.length / filesPerPage) || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UploadPage;
