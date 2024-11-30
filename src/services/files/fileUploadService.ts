import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

export const uploadToCloudinary = async (
  file: File,
  setUploadProgress: (progress: number) => void
): Promise<{ url: string; status: string; id: string }> => { 
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/files`, 
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
        },
      }
    );
    const url = response.data.url; 
    const id = response.data.file_id; 
    return { id, url, status: "success" }; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Upload failed:", error.response?.data || error.message);
      throw new Error(`Upload failed with status ${error.response?.status}: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};