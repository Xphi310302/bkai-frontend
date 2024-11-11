import ChatBot from "react-chatbotify";
import React from "react";
import { setting } from "./property/setting";
import { flow } from "./property/flow";
import { style } from "./property/style";
import { themes } from "./property/theme";

const ChatbotPopup: React.FC = () => {
  // necessary to embed the chatbot for it to show on the page
  return (
    <ChatBot settings={setting} flow={flow} styles={style} themes={themes} />
  );
};

export default ChatbotPopup;
