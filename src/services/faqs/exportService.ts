import axiosInstance from '../axios-config';
import { FAQ } from '../../components/FAQsPage/types';

interface FAQResponse extends FAQ {
  file_id: string;
}

export const getAllFAQsService = async (): Promise<FAQResponse[]> => {
  try {
    const response = await axiosInstance.get<FAQResponse[]>('/api/v1/get-all-faqs');
    return response.data;
  } catch (error) {
    console.error('Error fetching all FAQs:', error);
    throw error;
  }
};

export const exportFAQsToExcel = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/export_faqs', {
      responseType: 'blob'
    });
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `faqs_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting FAQs:', error);
    throw error;
  }
};
