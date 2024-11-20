import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

interface Params {
  conversation_id?: string;
  userInput: string;
  injectMessage: (message: string) => Promise<void>;
}
const call_openai = async (params: Params) => {
  // Check if conversation_id exists in local storage
  if (!params.conversation_id) {
    const storedId = localStorage.getItem("conversation_id");
    if (storedId) {
      params.conversation_id = storedId; // Use stored ID if it exists
    } else {
      params.conversation_id = uuidv4(); // Generate a new one if no stored ID
      localStorage.setItem("conversation_id", params.conversation_id); // Store the new ID
    }
  }
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

const flow = {
  start: {
    message:
      "Xin chào! Tôi là Civic Bot. Rất vui được hỗ trợ bạn với các thủ tục hành chính công. Bạn cần giúp đỡ gì ạ?",
    path: "loop",
  },
  loop: {
    message: async (params: Params): Promise<string | void> => {
      // Updated return type
      await call_openai(params);
      return; // Ensure it returns void
    },
    path: "loop", // Continue looping
  },
};

export { flow, call_openai };
