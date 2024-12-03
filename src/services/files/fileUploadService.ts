import axiosInstance from '../axios-config';

export const uploadToCloudinary = async (
  file: File,
  setUploadProgress: (progress: number) => void
): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(
      'api/v1/files/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        }
      }
    );
    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};