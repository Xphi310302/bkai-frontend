import axios from 'axios';
import type { FAQ, Document } from '../../components/FAQsPage/types';

const API_URL = 'https://api.example.com';

export async function getFAQsByDocument(documentId: string): Promise<FAQ[]> {
  try {
    const response = await axios.get(`${API_URL}/documents/${documentId}/faqs`);
    return response.data;
  } catch (error) {
    // Mock data for demonstration
    return [
      {
        id: documentId === 'doc1' ? 1 : 3,
        question: documentId === 'doc1' ? "What is coaching?" : "How to get started?",
        answer: documentId === 'doc1' ? "Coaching focuses on personal development." : "Contact our support team.",
        file_id: documentId // Ensure file_id is set correctly
      }
    ];
  }
}

export async function getDocuments(): Promise<Document[]> {
  try {
    const response = await axios.get(`${API_URL}/documents`);
    return response.data;
  } catch (error) {
    return [
      { id: "doc1", name: "Tài liệu về tư vấn đất đai" },
      { id: "doc2", name: "Tài liệu đăng ký kinh doanh" }
    ];
  }
}

export async function updateFAQ(faq: FAQ): Promise<FAQ> {
  try {
    const response = await axios.put(`${API_URL}/faqs/${faq.id}`, {
      question: faq.question,
      answer: faq.answer,
      documentId: faq.file_id
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update FAQ: ${error.message}`);
    }
    throw new Error('Failed to update FAQ');
  }
}