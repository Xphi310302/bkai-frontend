import axiosInstance from '../axios-config';
import { UploadedFile } from '../../components/UploadPage/FileTable'; // Import UploadedFile interface

interface MongoFiles {
  _id: string;
  file_id: string;
  file_ext: string;
  filename: string;
  url: string;
  uploaded_at: string;
}

export const getFilesService = async (): Promise<UploadedFile[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/files');
    
    console.log('API Response:', response.data); // Debug log

    if (!response.data) {
      console.error('No data in API response');
      throw new Error("Invalid response format");
    }

    const filesData = Array.isArray(response.data) ? response.data : [response.data];
    
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