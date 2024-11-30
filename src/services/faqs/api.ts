import axiosInstance from '../axios-config';
import type { FAQ } from '../../components/FAQsPage/types';
import { getFilesService } from "../files/fileReadService";
import { UploadedFile } from '@/components/UploadPage/FileTable';

// const BASE_URL = import.meta.env.VITE_BACKEND_URL; 

export async function getFAQsByDocument(fileName: string): Promise<FAQ[]> {
  try {
    const response = await axiosInstance.get(`/api/v1/get-faqs-by-file-name/${fileName}`);
    const data = response.data; // Directly use response.data

    // Log the entire response for debugging
    console.log("API Response:", data);

    // Check if the response is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid response structure: Expected an array");
    }

    return data.map((item: { faq_id: string; question: string; answer: string; file_id: string; verify: boolean }) => ({
      question: item.question,
      answer: item.answer,
      file_id: item.file_id,
      file_name: fileName,
      verify: item.verify,
      faq_id: item.faq_id, // Include faq_id if needed
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw new Error("Failed to fetch FAQs");
  }
}

export const getDocuments = async (): Promise<UploadedFile[]> => {
  try {
    return await getFilesService();
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Failed to fetch documents");
  }
};

// export async function updateFAQ(faq: FAQ): Promise<FAQ> {
//   try {
//     const response = await axiosInstance.put(`/faqs/${faq.id}`, {
//       question: faq.question,
//       answer: faq.answer,
//       documentId: faq.file_id
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(`Failed to update FAQ: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
// }