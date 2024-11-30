import axios from "axios";

export const uploadToCloudinary = async (
  file: File,
  setUploadProgress: (progress: number) => void
): Promise<{ url: string; status: string; id: string }> => { // Update return type to include id
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/files`, // Ensure this URL is correct
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          const current = progressEvent.loaded || 0;
          const percentCompleted = Math.round((current * 100) / total);
          setUploadProgress(percentCompleted); // Update progress
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    const url = response.data.url; // Assuming your backend returns the URL
    const id = response.data.file_id; 
    return { id, url, status: "success" }; // Return URL, status, and another ID
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