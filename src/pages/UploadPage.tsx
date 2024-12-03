import React, { useState, useEffect } from "react";
import FileUploader from "../components/UploadPage/FileUploader";
import FileTable from "../components/UploadPage/FileTable";
import Pagination from "../components/UploadPage/Pagination";
import { getFilesService } from "../services/files/fileReadService";
import { deleteFileService } from "../services/files/fileDeleteService";
import { UploadedFile } from "../components/UploadPage/types/files";

type SortField = 'fileName' | 'dateModified';
type SortDirection = 'asc' | 'desc';

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [currentFiles, setCurrentFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>('fileName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const filesPerPage = 10;

  const sortFiles = (files: UploadedFile[]): UploadedFile[] => {
    return [...files].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'fileName') {
        comparison = a.fileName.localeCompare(b.fileName);
      } else {
        comparison = new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // If clicking the same field, toggle direction
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await getFilesService();
      setUploadedFiles(response);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    // Filter and sort files
    const filteredFiles = uploadedFiles.filter((file) =>
      file && file.fileName ? file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) : false
    );
    
    const sortedFiles = sortFiles(filteredFiles);

    // Paginate the filtered and sorted files
    const startIndex = (currentPage - 1) * filesPerPage;
    const endIndex = startIndex + filesPerPage;
    setCurrentFiles(sortedFiles.slice(startIndex, endIndex));
  }, [uploadedFiles, searchQuery, currentPage, sortField, sortDirection]);

  const onDeleteFile = async (fileId: string) => {
    try {
      await deleteFileService(fileId);
      fetchFiles();
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
      <FileTable 
        files={currentFiles} 
        onDeleteFile={onDeleteFile}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(uploadedFiles.length / filesPerPage) || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UploadPage;
