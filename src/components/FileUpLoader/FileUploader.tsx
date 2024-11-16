import React, { useState } from "react";
import { uploadToCloudinary } from "../../services/fileUploadServices";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const url = await uploadToCloudinary(file);
        setFileUrl(url);
        setFileType(file.type);
        setError(null);
        setSuccessMessage("Upload successful!");
      } catch (err) {
        setError("Upload failed. Please try again.");
        setSuccessMessage(null);
        console.error(err);
      }
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className="mt-4 p-4 border rounded shadow bg-white">
      <p className="text-gray-600 mb-2">
        Accepted formats: .pdf, .doc, .docx, images
      </p>
      {/* File input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileChange}
        className="mb-2 border rounded p-2"
      />
      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Upload File
      </button>
      {/* Feedback messages */}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && (
        <p className="text-green-700">{successMessage}</p>
      )}{" "}
      {/* Adjusted green tone */}
      {/* Display uploaded file */}
      {fileUrl && fileType && (
        <div className="mt-2">
          {fileType.startsWith("image/") ? (
            <img src={fileUrl} alt="Uploaded" className="max-w-xs rounded" />
          ) : (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Download Uploaded File
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
