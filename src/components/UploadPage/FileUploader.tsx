import React, { useRef, useState, useEffect } from "react";
import { uploadToCloudinary } from "../../services/files/fileUploadService";
import { UploadedFile } from "../UploadPage/types/files";
import { Upload } from "lucide-react";
interface FileUploaderProps {
  onUploadComplete: () => void; // Callback for when all uploads are complete
  existingFiles: UploadedFile[]; // List of existing files to check for duplicates
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadComplete,
  existingFiles,
}) => {
  const [files, setFiles] = useState<File[]>([]); // Store the selected files
  const [error, setError] = useState<string | null>(null);
  const [duplicateFiles, setDuplicateFiles] = useState<string[]>([]);
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false);
  const [uploadingCount, setUploadingCount] = useState<number>(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      setFiles([]);
      setError(null);
      setDuplicateFiles([]);
      setIsProgressVisible(false);
      setUploadingCount(0);
      setUploadedFiles([]);
    };
  }, []);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const resetMessages = () => {
    setError(null);
    setDuplicateFiles([]);
    setIsProgressVisible(true);
    setUploadingCount(0);
    setUploadedFiles([]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Sort files alphabetically by name
      const selectedFiles = Array.from(e.target.files).sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      // Validate file type
      const invalidFiles = selectedFiles.filter(
        (file) => !file.type.toLowerCase().includes("pdf")
      );
      if (invalidFiles.length > 0) {
        setError("Chỉ chấp nhận file PDF");
        return;
      }

      // Validate file count
      if (selectedFiles.length > 10) {
        setError("Chỉ được phép tải lên tối đa 10 file một lần");
        return;
      }

      // Check for duplicate file names
      const duplicateFiles = selectedFiles.filter((file) =>
        existingFiles.some(
          (existingFile) => existingFile.fileName === file.name
        )
      );

      if (duplicateFiles.length > 0) {
        setDuplicateFiles(duplicateFiles.map((f) => f.name));
        return;
      }

      setFiles(selectedFiles);
      resetMessages();

      // Start uploading files immediately after selection
      await uploadFiles(selectedFiles);
    }
  };

  const uploadFiles = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      try {
        setUploadingCount((prev) => prev + 1);
        await uploadToCloudinary(file, () => {});
        setUploadedFiles((prev) => [...prev, file]);
      } catch (err) {
        console.error(`Error uploading file ${file.name}:`, err);
        setError(`Lỗi tải tệp ${file.name}. Vui lòng thử lại!`);
      } finally {
        setUploadingCount((prev) => prev - 1);
      }
    });

    try {
      await Promise.all(uploadPromises);
      onUploadComplete();
    } catch (err) {
      setError("Tải tệp lên thất bại. Vui lòng thử lại!");
      console.error(err);
    } finally {
      setIsProgressVisible(false);
    }
  };

  const calculateProgress = () =>
    uploadingCount > 0 ? (uploadedFiles.length / files.length) * 100 : 0;

  const closeDuplicatePopup = () => {
    setDuplicateFiles([]);
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="hidden"
        multiple
        ref={fileInputRef}
      />
      <button
        onClick={openFileDialog}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      >
        <Upload className="inline w-4 h-4 mr-1" /> <strong>Tải lên</strong>
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {duplicateFiles.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Tệp đã tồn tại
            </h2>
            <p className="mb-4">Các tệp sau đã tồn tại trong hệ thống:</p>
            <ul className="list-disc list-inside mb-4">
              {duplicateFiles.map((fileName, index) => (
                <li key={index} className="text-gray-700">
                  {fileName}
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                onClick={closeDuplicatePopup}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {isProgressVisible && uploadingCount > 0 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-50 border border-green-300 rounded-lg shadow-lg p-6 z-50 transition-transform scale-105">
          <p className="text-green-800 font-bold text-lg">
            Đang tải lên... {uploadingCount} tệp đang được xử lý
          </p>
          <div className="bg-green-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <p className="text-green-600 mt-2">
            Hãy kiên nhẫn, chúng tôi đang xử lý tệp của bạn!
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
