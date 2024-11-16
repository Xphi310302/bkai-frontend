import React from "react";
import FileUploader from "../../components/FileUpLoader/FileUploader";

const UploadPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Upload File to Cloudinary</h1>
      {/* Directly render the FileUploader component */}
      <FileUploader />
    </div>
  );
};

export default UploadPage;
