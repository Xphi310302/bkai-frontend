import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL // Replace with your actual backend URL

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
    const conversationId = localStorage.getItem('conversation_id');

    const response = await axios.post<ChatResponse>(
      `${BASE_URL}/api/v1/chat`,
      {
        conversation_id: conversationId,
        message: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Store the conversation ID for future messages
    if (response.data.conversation_id) {
      localStorage.setItem('conversation_id', response.data.conversation_id);
    }

    return response.data.response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw new Error('Failed to process your message. Please try again.');
  }
}