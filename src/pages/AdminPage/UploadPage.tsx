import React, { useState } from "react";
import FileUploader from "../../components/FileUpLoader/FileUploader";

interface UploadedFile {
  name: string;
  url: string;
  dateUploaded: string;
}

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = (fileUrl: string, fileName: string) => {
    const newFile: UploadedFile = {
      name: fileName,
      url: fileUrl,
      dateUploaded: new Date().toLocaleString(), // Format the date as needed
    };
    setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
  };

  const handleDeleteFile = (url: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.url !== url)
    );
  };

  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Quản lý dữ liệu</h1>

      {/* Search and File Uploader */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tệp tin"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-400"
        />
        <FileUploader onFileUpload={handleFileUpload} />
      </div>

      {/* File Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600">
              <th className="py-2 px-4 border-b">Tên file</th>
              <th className="py-2 px-4 border-b">Ngày tạo</th>
              <th className="py-2 px-4 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <tr key={file.url} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{file.name}</td>
                  <td className="py-2 px-4 border-b">{file.dateUploaded}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Tải xuống
                      </a>
                      <button
                        onClick={() => handleDeleteFile(file.url)}
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
    </div>
  );
};

export default UploadPage;
