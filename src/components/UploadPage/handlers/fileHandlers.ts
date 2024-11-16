interface UploadedFile {
  name: string;
  url: string;
  dateUploaded: string;
}

export const handleFileUpload = (fileUrl: string, fileName: string, setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => {
  const newFile: UploadedFile = {
    name: fileName,
    url: fileUrl,
    dateUploaded: new Date().toLocaleString(),
  };
  setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
};

export const handleDeleteFile = (url: string, setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => {
  setUploadedFiles((prevFiles) =>
    prevFiles.filter((file) => file.url !== url)
  );
};