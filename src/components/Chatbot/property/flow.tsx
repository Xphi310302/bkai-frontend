// src/components/Chatbot/property/flow.tsx
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Flow as OriginalFlow, Block as OriginalBlock } from "react-chatbotify";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

// Create a random conversation_id on script load
const initialConversationId = uuidv4();
localStorage.setItem("conversation_id", initialConversationId);

// Align Params interface with react-chatbotify's expected structure
interface Params {
  conversation_id?: string;
  userInput: string;
  injectMessage: (message: string) => Promise<string | null>;
}

// Extend the OriginalBlock to include async message handling
interface ExtendedBlock extends OriginalBlock {
  message: string | void | ((params: Params) => Promise<string | void>);
}

// Extend the OriginalFlow to use ExtendedBlock
interface ExtendedFlow extends OriginalFlow {
  [key: string]: ExtendedBlock;
}

// Function to call OpenAI API
const callOpenAI = async (params: Params) => {
  // Use the initial conversation ID set at script load
  params.conversation_id =
    params.conversation_id ||
    localStorage.getItem("conversation_id") ||
    initialConversationId;
  console.log(params.conversation_id);

  try {
    const response = await axios.post(
      `${BACK_END_URL}/api/v1/chat`,
      {
        conversation_id: params.conversation_id,
        message: params.userInput,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await params.injectMessage(response.data.response);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    await params.injectMessage("Unable to process your request at the moment.");
  }
};

// Define the flow using the ExtendedFlow type
const flow: ExtendedFlow = {
  start: {
    message:
      "Xin chào! Tôi là Civic Bot. Rất vui được hỗ trợ bạn với các thủ tục hành chính công. Bạn cần giúp đỡ gì ạ?",
    path: "loop",
  },
  loop: {
    message: async (params: Params): Promise<string | void> => {
      await callOpenAI(params);
    },
    path: "loop",
  },
};

export { flow, callOpenAI };
