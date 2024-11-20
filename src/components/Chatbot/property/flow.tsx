import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

const call_openai = async (params) => {
  try {
    const response = await axios.post(
      `${BACK_END_URL}/api/v1/chat`,
      {
        conversation_id: params.conversation_id || uuidv4(),
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
    message: "Welcome! Please enter your query to get started.",
    path: "loop",
  },
  loop: {
    message: async (params) => {
      await call_openai(params);
    },
    path: "loop", // Continue looping
  },
};

export { flow, call_openai };
