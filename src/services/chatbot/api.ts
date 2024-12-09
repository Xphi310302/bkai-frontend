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

// Variable to store the current conversation ID
let currentConversationId: string | null = null;

// Function to initialize a new conversation ID
export function initializeNewConversation(): void {
  currentConversationId = uuidv4();
  localStorage.removeItem('conversation_id'); // Clear the stored conversation ID
}

// Initialize new conversation ID on page load
initializeNewConversation();

export async function sendMessage(message: string): Promise<string> {
  try {
    // If there's no current conversation ID, initialize one
    if (!currentConversationId) {
      currentConversationId = uuidv4();
    }

    console.log('Sending message:', message, 'with conversation ID:', currentConversationId);
    const response = await axiosInstance.post<ChatResponse>(
      `/api/v1/chat`,
      {
        conversation_id: currentConversationId,
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