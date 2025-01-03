import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDownload, 
  faTrash, 
  faSort, 
  faSortUp, 
  faSortDown, 
  faFilePdf 
} from "@fortawesome/free-solid-svg-icons";
import { UploadedFile } from "./types/files";
import ConfirmationModal from '../ConfirmationModal';

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
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.file-table-container')) {
        setSelectedFileId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRowClick = (event: React.MouseEvent, fileId: string) => {
    event.stopPropagation();
    setSelectedFileId(fileId);
  };

  const getSortIcon = (field: 'fileName' | 'dateModified') => {
    const iconClass = "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4";
    
    if (sortField !== field) {
      return (
        <span className="inline-block relative w-4 h-4">
          <FontAwesomeIcon 
            icon={faSort} 
            className={`${iconClass} text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity`}
          />
        </span>
      );
    }
    
    return (
      <span className="inline-block relative w-4 h-4">
        {sortDirection === 'asc' ? (
          <FontAwesomeIcon 
            icon={faSortUp} 
            className={`${iconClass} text-green-600`}
          />
        ) : (
          <FontAwesomeIcon 
            icon={faSortDown} 
            className={`${iconClass} text-green-600`}
          />
        )}
      </span>
    );
  };

  const handleDelete = async (fileId: string) => {
    try {
      await onDeleteFile(fileId);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const handleDeleteClick = (fileId: string) => {
    setFileToDelete(fileId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (fileToDelete) {
      await handleDelete(fileToDelete);
      setShowDeleteModal(false);
      setFileToDelete(null);
    }
  };

  return (
    <div 
      className="overflow-x-auto bg-white rounded-lg shadow-md file-table-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedFileId(null);
        }
      }}
    >
      <table className="min-w-full table-fixed">
        <colgroup>
          <col className="w-[500px]" />
          <col className="w-[200px]" />
          <col className="w-[150px]" />
          <col className="w-[150px]" />
        </colgroup>
        <thead>
          <tr>
            <th 
              onClick={() => onSort('fileName')}
              className={`
                relative py-3 px-6 border-b-2 border-gray-200 bg-gray-50
                text-left text-xs font-semibold text-gray-600 uppercase tracking-wider
                cursor-pointer select-none group
                transition-colors duration-200 ease-in-out font-inter
                ${sortField === 'fileName' ? 'bg-green-50' : 'hover:bg-gray-100'}
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`
                  transition-colors duration-200 ease-in-out
                  ${sortField === 'fileName' ? 'text-green-700' : 'group-hover:text-green-600'}
                `}>
                  Tên tệp
                </span>
                {getSortIcon('fileName')}
              </div>
            </th>
            <th 
              onClick={() => onSort('dateModified')}
              className={`
                relative py-3 px-6 border-b-2 border-gray-200 bg-gray-50
                text-left text-xs font-semibold text-gray-600 uppercase tracking-wider
                cursor-pointer select-none group
                transition-colors duration-200 ease-in-out font-inter
                ${sortField === 'dateModified' ? 'bg-green-50' : 'hover:bg-gray-100'}
                text-center
              `}
            >
              <div className="flex items-center justify-center relative">
                <span className={`
                  transition-colors duration-200 ease-in-out
                  ${sortField === 'dateModified' ? 'text-green-700' : 'group-hover:text-green-600'}
                `}>
                  Ngày cập nhật
                </span>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  {getSortIcon('dateModified')}
                </div>
              </div>
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
              Tình Trạng
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.length > 0 ? (
            files.map((file) => (
              <tr 
                key={file.fileId} 
                className={`transition-colors duration-75 cursor-pointer
                  ${selectedFileId === file.fileId 
                    ? 'bg-[#e1ecf9] text-black' 
                    : 'hover:bg-[#f5f9fe]'
                  }
                `}
                onClick={(e) => handleRowClick(e, file.fileId)}
                onDoubleClick={() => window.open(`/faqs?fileId=${file.fileId}`, '_blank')}
              >
                <td className="py-4 px-6 w-[400px]">
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon 
                      icon={faFilePdf} 
                      className="text-red-500 w-6 h-6 flex-shrink-0 mt-1" 
                    />
                    <div className="text-base font-medium text-gray-900 font-inter break-words">
                      {file.fileName}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 w-[200px] text-center">
                  <div className="text-base text-gray-500 font-roboto">
                    {new Date(file.dateModified).toLocaleString('vi-VN')}
                  </div>
                </td>
                <td className="py-4 px-6 w-[150px] text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    file.isProcessing 
                      ? 'bg-orange-100 text-orange-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {file.isProcessing ? 'Đang xử lý' : 'Đã xử lý'}
                  </div>
                </td>
                <td className="py-4 px-6 w-[150px] text-center">
                  <div className="flex items-center justify-center space-x-4">
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
                      onClick={() => handleDeleteClick(file.fileId)}
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
                colSpan={4} 
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
      <ConfirmationModal
        show={showDeleteModal}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa tệp này không?"
        action="delete"
        onClose={() => {
          setShowDeleteModal(false);
          setFileToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default FileTable;
