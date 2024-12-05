import axiosInstance from '../axios-config';
import { UploadedFile } from '../../components/UploadPage/types/files'; 

interface APIResponse {
  file_id: string;
  file_name: string;
  file_url: string;
  date_modified: string;
  is_processing: boolean;
}

export const getFilesService = async (): Promise<UploadedFile[]> => {
  try {
    const response = await axiosInstance.get('api/v1/files');

    if (!response.data) {
      console.error('No data in API response');
      return [];
    }

    const filesData = Array.isArray(response.data) ? response.data : [response.data];

    return filesData.map((file: APIResponse) => ({
      fileId: file.file_id,
      fileName: file.file_name,
      fileUrl: file.file_url,
      dateModified: file.date_modified,
      isProcessing: file.is_processing
    }));

  } catch (error) {
    console.error('Error in getFilesService:', error);
    return [];
  }
};

export const getFileByIdService = async (fileId: string): Promise<UploadedFile | null> => {
  try {
    const response = await axiosInstance.get<APIResponse>(`/api/v1/files/${fileId}`);

    return {
      fileId: response.data.file_id,
      fileName: response.data.file_name,
      fileUrl: response.data.file_url,
      dateModified: response.data.date_modified,
      isProcessing: response.data.is_processing
    };

  } catch (error) {
    console.error('Error in getFileByIdService:', error);
    return null;
  }
};
