import axiosInstance from '../axios-config';
import type { FAQ } from '../../components/FAQsPage/types';
import { getFilesService } from "../files/fileReadService";
import { UploadedFile } from '@/components/UploadPage/types/files';

export async function getFAQsByDocument(fileName: string): Promise<FAQ[]> {
  try {
    console.log(`Fetching FAQs by document: ${fileName}`);
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
    console.log(`Fetching FAQs by file ID: ${fileId}`);
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
    console.log("Fetching documents");
    return await getFilesService();
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw new Error("Failed to fetch documents");
  }
};

export async function insertFAQ(faq: FAQ): Promise<FAQ> {
  try {
    console.log("Inserting FAQ", faq);
    const response = await axiosInstance.post('/api/v1/insert-faq', faq);
    return response.data;
  } catch (error) {
    console.error("Error inserting FAQ:", error);
    throw error;
  }
}

export async function modifyFAQ(faq: FAQ): Promise<FAQ> {
  try {
    console.log("Modifying FAQ", faq);
    const response = await axiosInstance.put('/api/v1/modify-faq', faq);
    return response.data;
  } catch (error) {
    console.error("Error modifying FAQ:", error);
    throw error;
  }
}

export async function updateFAQStatus(faqIds: string[]): Promise<void> {
  try {
    console.log("Updating FAQ status for IDs", faqIds);
    await axiosInstance.post('/api/v1/update_faq_status', { faq_ids: faqIds });
  } catch (error) {
    console.error("Error updating FAQ status:", error);
    throw error;
  }
}

export async function deleteFAQ(faqId: string): Promise<void> {
  try {
    console.log(`Deleting FAQ with ID: ${faqId}`);
    await axiosInstance.delete(`/api/v1/delete-faq/${faqId}`);
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    throw error;
  }
}
