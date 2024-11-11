import React from "react";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import "./App.css";
import ChatbotPopup from "./components/Chatbot/ChatbotPopup";
const App: React.FC = () => {
  return (
    <>
      <ChatbotPopup />
      <div className="App">
        <Header />
        <MainContent />
        <Footer />
      </div>
      );
    </>
  );
};

export default App;
