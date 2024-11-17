import React from "react";

export interface UploadedFile {
  file_id: string;
  name: string;
  url: string;
  dateUploaded: string;
}

interface FileTableProps {
  files: UploadedFile[];
  onDeleteFile: (fileId: string) => void; // Ensure this prop is defined
}

const FileTable: React.FC<FileTableProps> = ({ files, onDeleteFile }) => {
  const handleDelete = async (fileId: string) => {
    try {
      await onDeleteFile(fileId); // Call the onDeleteFile function
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600">
            <th className="py-2 px-4 border-b text-green-700 w-1/3">
              Tên file
            </th>
            <th className="py-2 px-4 border-b text-green-700 w-1/3">
              Ngày tạo
            </th>
            <th className="py-2 px-4 border-b text-green-700 w-1/3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file) => (
              <tr key={file.file_id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{file.name}</td>
                <td className="py-2 px-4 border-b">{file.dateUploaded}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      Tải xuống
                    </a>
                    <button
                      onClick={() => handleDelete(file.file_id)} // Call handleDelete with file_id
                      className="text-red-500 underline"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-500">
                Không tìm thấy tệp tin nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
