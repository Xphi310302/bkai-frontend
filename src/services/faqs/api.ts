import axiosInstance from '../axios-config';
import type { FAQ } from '../../components/FAQsPage/types';
import { getFilesService } from "../files/fileReadService";
import { UploadedFile } from '@/components/UploadPage/types/files';

export async function getFAQsByDocument(fileName: string): Promise<FAQ[]> {
  try {
    const response = await axiosInstance.get(`/api/v1/get-faqs-by-file-name/${fileName}`);
    const data = response.data;

    console.log("API Response:", data);

    if (!Array.isArray(data)) {
      throw new Error("Invalid response structure: Expected an array");
    }

    return data.map((item: FAQ) => ({
      faq_id: item.faq_id,
      question: item.question,
      answer: item.answer,
      file_id: item.file_id,
      is_source: item.is_source,
      created: item.created,
      modified: item.modified,
      deleted: item.deleted
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

    const mappedData = data.map((item: FAQ) => ({
      faq_id: item.faq_id,
      question: item.question,
      answer: item.answer,
      file_id: item.file_id,
      is_source: item.is_source,
      created: item.created,
      modified: item.modified,
      deleted: item.deleted
    }));

    console.log("Mapped FAQs data:", mappedData);
    return mappedData;
  } catch (error) {
    console.error("Error in getFAQsByFileId:", error);
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

export async function insertFAQ(faq: FAQ): Promise<FAQ> {
  try {
    const response = await axiosInstance.post('/api/v1/insert-faq', faq);
    return response.data;
  } catch (error) {
    console.error("Error inserting FAQ:", error);
    throw error;
  }
}

export async function modifyFAQ(faq: FAQ): Promise<FAQ> {
  try {
    const response = await axiosInstance.post('/api/v1/modify-faq', faq);
    return response.data;
  } catch (error) {
    console.error("Error modifying FAQ:", error);
    throw error;
  }
}
