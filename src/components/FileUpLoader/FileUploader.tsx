import React, { useRef, useState } from "react";
import { uploadToCloudinary } from "../../services/fileUploadServices";

interface FileUploaderProps {
  onFileUpload: (fileUrl: string, fileName: string) => void; // Prop to handle file upload
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [files, setFiles] = useState<File[]>([]); // Store the selected files
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Track upload progress
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false); // Control visibility of progress bar
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
      setFiles(selectedFiles); // Set the selected files
      resetMessages(); // Clear messages

      // Start uploading files immediately after selection
      await uploadFiles(selectedFiles);
    }
  };

  const resetMessages = () => {
    setError(null); // Clear any previous errors
    setUploadProgress(0); // Reset progress
    setIsProgressVisible(true); // Show progress bar
  };

  const uploadFiles = async (files: File[]) => {
    const uploadPromises = files.map(
      (file) => uploadToCloudinary(file, updateProgress) // Pass progress updater
    );
    try {
      const urls = await Promise.all(uploadPromises); // Upload each file

      // Call the onFileUpload for each uploaded file
      urls.forEach((url, index) => {
        onFileUpload(url, files[index].name);
      });
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      // Hide progress bar after upload is complete
      setIsProgressVisible(false);
    }
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
    <div>
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
      {error && <p className="text-red-500">{error}</p>}

      {/* Progress Bar Popup */}
      {isProgressVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded shadow-lg p-4 z-50">
          <p className="text-gray-600">
            Uploading: {Math.round(uploadProgress)}%
          </p>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
