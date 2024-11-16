import React from "react";
import Header from "../components/Header/Header";
import MainContent from "../components/MainContent/MainContent";
import Footer from "../components/Footer/Footer";
import ChatbotPopup from "../components/Chatbot/ChatbotPopup"; // Import the ChatbotPopup

const HomePage: React.FC = () => {
  return (
    <div>
      <ChatbotPopup /> {/* Include the ChatbotPopup here */}
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default HomePage;
