import axiosInstance from '../axios-config';

export const uploadToCloudinary = async (
  file: File,
  setUploadProgress: (progress: number) => void
): Promise<{ url: string; status: string; id: string }> => {
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

    const url = response.data.url;
    const id = response.data.file_id;
    return { id, url, status: "success" };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};