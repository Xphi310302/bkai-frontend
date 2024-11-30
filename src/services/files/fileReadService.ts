import axios from 'axios';
// Check if BASE_URL is defined
const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env
import { UploadedFile } from '../../components/UploadPage/FileTable'; // Import UploadedFile interface

interface MongoFiles {
  _id: string;
  file_id: string;
  file_ext: string;
  filename: string;
  url: string;
  uploaded_at: string;
}

// Configure axios defaults for ngrok
const axiosInstance = axios.create({
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

export const getFilesService = async (): Promise<UploadedFile[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/api/v1/files`);
    
    console.log('API Response:', response.data); // Debug log

    // Test the API response
    if (!response.data) {
      console.error('No data in API response');
      throw new Error("Invalid response format");
    }

    // Handle both array and object responses
    const filesData = Array.isArray(response.data) ? response.data : [response.data];
    
    // Transform the data to match UploadedFile interface
    return filesData.map((file: MongoFiles) => ({
      fileId: file.file_id || file._id,
      name: file.filename,
      url: file.url,
      dateUploaded: file.uploaded_at
    }));

  } catch (error) {
    console.error('Error in getFilesService:', error);
    throw error;
  }
};