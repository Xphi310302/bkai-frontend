import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env

export const deleteFileService = async (fileId: string) => {
  console.log(`Attempting to delete file with ID: ${fileId}`); // Debug: Log the file ID being deleted
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/files/${fileId}`); // Use the base URL
    console.log("File deleted successfully:", response.data); // Debug: Log the successful response
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting file:", error); // Log the error
    throw error; // Rethrow the error for handling in the calling function
  }
};
