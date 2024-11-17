import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env

export const deleteFileService = async (fileId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/files/${fileId}`); // Use the base URL
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

