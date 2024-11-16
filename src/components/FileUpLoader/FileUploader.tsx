import React, { useRef, useState } from "react";
import { uploadToCloudinary } from "../../services/fileUploadServices";

interface FileUploaderProps {
  onFileUpload: (fileUrl: string, fileName: string) => void; // Prop to handle file upload
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [files, setFiles] = useState<File[]>([]); // Store the selected files
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Track upload progress
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
      setFiles(selectedFiles); // Set the selected files
      resetMessages(); // Clear messages and reset progress
    }
  };

  const resetMessages = () => {
    setError(null); // Clear any previous errors
    setSuccessMessage(null); // Clear success message
    setUploadProgress(0); // Reset progress
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      try {
        const urls = await uploadFiles(files);
        setSuccessMessage("Upload successful!");

        // Call the onFileUpload for each uploaded file
        urls.forEach((url, index) => {
          onFileUpload(url, files[index].name);
        });
      } catch (err) {
        setError("Upload failed. Please try again.");
        console.error(err);
      }
    } else {
      setError("Please select files to upload."); // Error if no files are selected
    }
  };

  const uploadFiles = async (files: File[]) => {
    const uploadPromises = files.map(
      (file) => uploadToCloudinary(file, updateProgress) // Pass progress updater
    );
    return Promise.all(uploadPromises); // Upload each file
  };

  const updateProgress = (progress: number) => {
    setUploadProgress((prevProgress) => {
      const newProgress = prevProgress + progress / files.length;
      return Math.min(newProgress, 100); // Ensure it doesn't exceed 100%
    });
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <div className="mt-4 p-4 border rounded shadow bg-white">
      <p className="text-gray-600 mb-2">
        Accepted formats: .pdf, .doc, .docx, images
      </p>
      <input
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileChange}
        className="hidden"
        multiple // Allow multiple file selection
        ref={fileInputRef} // Attach the ref to the file input
      />
      <button
        onClick={openFileDialog} // Open file dialog on button click
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Upload Files
      </button>
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Start Upload
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {/* Progress bar */}
      {uploadProgress > 0 && (
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{Math.round(uploadProgress)}%</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
