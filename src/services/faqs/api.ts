import axios from 'axios';
import type { FAQ } from '../../components/FAQsPage/types';
import { getFilesService } from "../files/fileReadService";
import { UploadedFile } from '@/components/UploadPage/FileTable';

const BASE_URL = import.meta.env.VITE_BACKEND_URL; 

export async function getFAQsByDocument(fileURL: string): Promise<FAQ[]> {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/generate-qa`, { file_url: fileURL });
    const { data } = response;

    if (!data || !data.data) {
      throw new Error("Invalid response structure");
    }

    return data.data.map((item: { Question: string; Answer: string; Filename: string }) => ({
      question: item.Question,
      answer: item.Answer,
      file_id: item.Filename,
      url: fileURL
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

export async function updateFAQ(faq: FAQ): Promise<FAQ> {
  try {
    const response = await axios.put(`${BASE_URL}/faqs/${faq.id}`, {
      question: faq.question,
      answer: faq.answer,
      documentId: faq.file_id
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update FAQ: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}