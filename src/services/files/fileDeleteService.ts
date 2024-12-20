import axiosInstance from '../axios-config';

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
    // Step 1: Delete all FAQs by fileId
    const response = await axiosInstance.delete(`/api/v1/delete-faqs-by-file-id/${fileId}`);
    console.log(`Successfully deleted FAQs for file ID: ${fileId}`, response.data);
  } catch (error) {
    console.error(`Error in deleteFAQsByFileId for file ID ${fileId}:`, error);
    throw error;
  }
};


