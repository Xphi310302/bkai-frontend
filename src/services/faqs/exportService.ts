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
