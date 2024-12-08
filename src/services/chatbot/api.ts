
import axios from "axios";
import axiosInstance from '../axios-config';
import { v4 as uuidv4 } from 'uuid'; 

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your actual backend URL
console.log(BASE_URL);

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  response: string;
  conversation_id: string;
}

export async function sendMessage(message: string): Promise<string> {
  try {
    // Use the same conversation ID for the same tab
    const conversationId = localStorage.getItem('conversation_id') || uuidv4();
    localStorage.setItem('conversation_id', conversationId);

    console.log('Sending message:', message, 'with conversation ID:', conversationId);
    const response = await axiosInstance.post<ChatResponse>(
      `/api/v1/chat`,
      {
        conversation_id: conversationId,
        message: message,
      }
    );

    return response.data.response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data); // Log the error response
      throw new Error(`Network error: ${error.message}`);
    }
    throw new Error('Failed to process your message. Please try again.');
  }
}