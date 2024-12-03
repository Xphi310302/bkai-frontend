import axiosInstance from '../axios-config';

export const uploadToCloudinary = async (
  file: File,
  setUploadProgress: (progress: number) => void
): Promise<{ fileId: string; fileName: string; fileUrl: string; dateModified: string; isProcessing: boolean }> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(
      '/api/v1/files',
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    const fileUrl = response.data.file_url;
    const fileId = response.data.file_id;
    const dateModified = response.data.date_modified;
    const isProcessing = response.data.is_processing;
    const fileName = response.data.filename;

    return { fileId, fileName, fileUrl, dateModified, isProcessing };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};