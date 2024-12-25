import React, { useState, useEffect, useCallback } from "react";
import FileUploader from "../components/UploadPage/FileUploader";
import FileTable from "../components/UploadPage/FileTable";
import Pagination from "../components/UploadPage/Pagination";
import { getFilesService } from "../services/files/fileReadService";
import { deleteFileService, deleteFAQsByFileId } from "../services/files/fileDeleteService";
import { exportFAQsToExcel } from "../services/faqs/exportService";
import { UploadedFile } from "../components/UploadPage/types/files";

type SortField = 'fileName' | 'dateModified';
type SortDirection = 'asc' | 'desc';

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [currentFiles, setCurrentFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>('dateModified');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const filesPerPage = 10;

  const sortFiles = useCallback((files: UploadedFile[]): UploadedFile[] => {
    return [...files].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'fileName') {
        comparison = a.fileName.localeCompare(b.fileName);
      } else {
        comparison = new Date(a.dateModified).getTime() - new Date(b.dateModified).getTime();
      }
      
      // If primary sort values are equal, use fileId as a stable secondary sort
      if (comparison === 0) {
        comparison = a.fileId.localeCompare(b.fileId);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [sortField, sortDirection]);

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
  }, [uploadedFiles, searchQuery, currentPage, sortField, sortDirection, sortFiles]);

  const onDeleteFile = async (fileId: string) => {
    try {
      // First delete all FAQs associated with the file
      await deleteFAQsByFileId(fileId);
      // Then delete the file itself
      await deleteFileService(fileId);
      // Refresh the file list
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
        <div className="flex items-center space-x-3 ml-4">
          <FileUploader 
            onUploadComplete={fetchFiles} 
            existingFiles={uploadedFiles} 
          />
          <button
            onClick={async () => {
              try {
                await exportFAQsToExcel();
              } catch (error) {
                console.error("Error exporting FAQs:", error);
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Xuất dữ liệu FAQ</span>
          </button>
        </div>
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
