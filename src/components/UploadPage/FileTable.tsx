import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash, faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { UploadedFile } from "./types/files";

interface FileTableProps {
  files: UploadedFile[];
  onDeleteFile: (fileId: string) => void;
  onSort: (field: 'fileName' | 'dateModified') => void;
  sortField: 'fileName' | 'dateModified';
  sortDirection: 'asc' | 'desc';
}

const FileTable: React.FC<FileTableProps> = ({ 
  files, 
  onDeleteFile, 
  onSort,
  sortField,
  sortDirection 
}) => {
  const getSortIcon = (field: 'fileName' | 'dateModified') => {
    if (sortField !== field) {
      return (
        <FontAwesomeIcon 
          icon={faSort} 
          className="ml-2 text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-green-500" 
        />
      );
    }
    return sortDirection === 'asc' ? (
      <FontAwesomeIcon 
        icon={faSortUp} 
        className="ml-2 text-green-600 transform transition-transform duration-200 ease-in-out" 
      />
    ) : (
      <FontAwesomeIcon 
        icon={faSortDown} 
        className="ml-2 text-green-600 transform transition-transform duration-200 ease-in-out" 
      />
    );
  };

  const handleDelete = async (fileId: string) => {
    try {
      await onDeleteFile(fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const TableHeader: React.FC<{
    field: 'fileName' | 'dateModified';
    children: React.ReactNode;
  }> = ({ field, children }) => (
    <th 
      onClick={() => onSort(field)}
      className={`
        py-3 px-6 border-b-2 border-gray-200 bg-gray-50
        text-left text-xs font-semibold text-gray-600 uppercase tracking-wider
        cursor-pointer select-none group
        transition-colors duration-200 ease-in-out font-inter
        ${sortField === field ? 'bg-green-50' : 'hover:bg-gray-100'}
      `}
    >
      <div className="flex items-center space-x-1">
        <span className={`
          transition-colors duration-200 ease-in-out
          ${sortField === field ? 'text-green-700' : 'group-hover:text-green-600'}
        `}>
          {children}
        </span>
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 font-roboto">
        <thead>
          <tr>
            <TableHeader field="fileName">Tên tệp</TableHeader>
            <TableHeader field="dateModified">Ngày cập nhật</TableHeader>
            <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.length > 0 ? (
            files.map((file) => (
              <tr 
                key={file.fileId} 
                className="transition-colors duration-150 ease-in-out hover:bg-gray-50"
              >
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="text-base font-medium text-gray-900 font-inter tracking-tight">
                    {file.fileName}
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="text-base text-gray-500 font-roboto">
                    {new Date(file.dateModified).toLocaleString('vi-VN')}
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-900 transition-colors duration-200"
                    >
                      <FontAwesomeIcon 
                        icon={faDownload} 
                        className="w-4 h-4 hover:scale-110 transform transition-transform duration-200"
                        aria-hidden="true" 
                      />
                    </a>
                    <button
                      onClick={() => handleDelete(file.fileId)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <FontAwesomeIcon 
                        icon={faTrash} 
                        className="w-4 h-4 hover:scale-110 transform transition-transform duration-200"
                        aria-hidden="true" 
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={3} 
                className="py-8 text-center text-gray-500 bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-lg font-medium font-inter">Không có tệp nào</span>
                  <span className="text-sm text-gray-400 font-roboto">Tải lên tệp PDF để bắt đầu</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
