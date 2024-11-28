import React from "react";
import Header from "../components/HomePage/Header/Header";
import MainContent from "../components/HomePage/MainContent/MainContent";
import Footer from "../components/HomePage/Footer/Footer";
// import ChatbotPopup from "../components/Chatbot/ChatbotPopup"; // Import the ChatbotPopup
import ChatBot from "../components/Chatbot/ChatBot";
const HomePage: React.FC = () => {
  return (
    <div>
      {/* <ChatbotPopup />  */}
      <ChatBot />
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default HomePage;
