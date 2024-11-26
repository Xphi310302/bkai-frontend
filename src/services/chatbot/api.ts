import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL // Replace with your actual backend URL
console.log(BASE_URL)
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
    // Check if conversation ID exists, if not, initialize it
    let conversationId = localStorage.getItem('conversation_id');
    if (!conversationId) {
      // Initialize a new conversation ID (you can generate a unique ID here)
      conversationId = 'new_conversation_id'; // Replace with actual ID generation logic
      localStorage.setItem('conversation_id', conversationId);
    }

    console.log('Sending message:', message, 'with conversation ID:', conversationId);
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
      console.error('Error response:', error.response?.data); // Log the error response
      throw new Error(`Network error: ${error.message}`);
    }
    throw new Error('Failed to process your message. Please try again.');
  }
}