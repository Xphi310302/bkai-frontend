import axiosInstance from '../axios-config';
import type { FAQ } from '../../components/FAQsPage/types';
import { getFilesService } from "../files/fileReadService";
import { UploadedFile } from '@/components/UploadPage/types/files';
 

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

export async function getFAQsByFileId(fileId: string): Promise<FAQ[]> {

  try {
    const response = await axiosInstance.get(`/api/v1/get-faqs-by-file-id/${fileId}`);

    if (!response.data) {
      throw new Error("No data received from API");
    }

    const data = response.data;

    if (!Array.isArray(data)) {
      console.error("Invalid response structure:", data);
      throw new Error("Invalid response structure: Expected an array");
    }

    const mappedData = data.map((item: { faq_id: string; question: string; answer: string; file_id: string; verify: boolean }) => ({
      question: item.question,
      answer: item.answer,
      file_id: item.file_id,
      verify: item.verify,
      faq_id: item.faq_id,
    }));

    console.log("Mapped FAQs data:", mappedData); // Debug log
    return mappedData;
  } catch (error) {
    console.error("Error in getFAQsByFileId:", error);
    throw error;
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
