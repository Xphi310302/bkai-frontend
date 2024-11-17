import React, { useRef, useState, useEffect } from "react";
import { uploadToCloudinary } from "../../services/fileUploadServices";

interface FileUploaderProps {
  onFileUpload: (fileUrl: string, fileName: string) => void; // Prop to handle file upload
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [files, setFiles] = useState<File[]>([]); // Store the selected files
  const [error, setError] = useState<string | null>(null);
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false); // Control visibility of progress bar
  const [uploadingCount, setUploadingCount] = useState<number>(0); // Track number of files being uploaded
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input

  useEffect(() => {
    // Clear files when component unmounts or when navigating away
    return () => {
      setFiles([]);
      setError(null);
      setIsProgressVisible(false);
      setUploadingCount(0);
    };
  }, []);

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
    setIsProgressVisible(true); // Show progress bar
    setUploadingCount(0); // Reset uploading count
  };

  const uploadFiles = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      setUploadingCount((prev) => prev + 1); // Increment uploading count
      const { url, status } = await uploadToCloudinary(file, () => {}); // Get URL and status
      setUploadingCount((prev) => prev - 1); // Decrement uploading count after upload
      return { url, status }; // Return the result
    });

    try {
      await Promise.all(uploadPromises); // Upload each file

      // Call the onFileUpload for each uploaded file
      files.forEach((file) => {
        onFileUpload(file.name, file.name); // Assuming you want to pass the file name as URL for now
      });
    } catch (err) {
      setError("Tải tệp lên thất bại. Vui lòng thử lại!");
      console.error(err);
    } finally {
      // Hide progress bar after upload is complete
      setIsProgressVisible(false);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const progressPercentage =
    ((files.length - uploadingCount) / files.length) * 100; // Calculate progress percentage

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
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Tải tệp lên
      </button>
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Bar Popup */}
      {isProgressVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-50 border border-green-300 rounded-lg shadow-lg p-6 z-50 transition-transform transform scale-105">
          <p className="text-green-800 font-bold text-lg">
            Đang tải lên... {uploadingCount} tệp đang được xử lý
          </p>{" "}
          {/* Display number of files being processed */}
          <div className="bg-green-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }} // Set width based on progress percentage
            />
          </div>
          <p className="text-green-600 mt-2">
            Hãy kiên nhẫn, chúng tôi đang xử lý tệp của bạn!
          </p>
        </div>
      )}
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          50% {
            width: 50%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FileUploader;
