import axiosInstance from '../axios-config';
import type { FAQ } from '../../components/FAQsPage/types';

export const deleteFileService = async (fileId: string) => {
  console.log(`Attempting to delete file with ID: ${fileId}`); // Debug: Log the file ID being deleted
  try {
    const response = await axiosInstance.delete(`/api/v1/files/${fileId}`); // Use the base URL
    console.log("File deleted successfully:", response.data); // Debug: Log the successful response
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting file:", error); // Log the error
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const deleteFAQsByFileId = async (fileId: string): Promise<void> => {
  try {
    // Step 1: Get all FAQs by fileId
    const response = await axiosInstance.get(`/api/v1/get-faqs-by-file-id/${fileId}`);
    const faqs: FAQ[] = response.data;
    
    // console.log(`Found ${faqs.length} FAQs for file ID: ${fileId}`);

    // Step 2 & 3: Delete each FAQ using their faq_id
    const deletePromises = faqs.map(async (faq) => {
      try {
        await axiosInstance.delete(`/api/v1/delete-faq/${faq.faq_id}`);
        console.log(`Successfully deleted FAQ with ID: ${faq.faq_id}`);
      } catch (error) {
        console.error(`Error deleting FAQ with ID ${faq.faq_id}:`, error);
        throw error;
      }
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);
    console.log(`Successfully deleted all FAQs for file ID: ${fileId}`);
  } catch (error) {
    console.error(`Error in deleteFAQsByFileId for file ID ${fileId}:`, error);
    throw error;
  }
};
