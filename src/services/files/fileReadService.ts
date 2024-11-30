import axios from 'axios';
// Check if BASE_URL is defined
const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env
import { UploadedFile } from '../../components/UploadPage/FileTable'; // Import UploadedFile interface

export interface MongoFiles {
  _id: string; // Added to match the response structure
  file_id: string; // Changed to match the response structure
  file_ext: string; // fileExtension[1:]
  filename: string; // Changed to match the response structure
  url: string; // file.filename
  uploaded_at: string; // Changed to match the response structure
}

export const getFilesService = async (): Promise<UploadedFile[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/ap1/v1/files`);
    
    // Test the API response
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data.map((file: MongoFiles) => ({
      fileId: file.file_id, // Updated to match the response structure
      name: file.filename, // Updated to match the response structure
      url: file.url,
      dateUploaded: file.uploaded_at, // Updated to match the response structure
    })) as UploadedFile[]; // Convert MongoFiles to UploadedFile
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to fetch files");
  }
};