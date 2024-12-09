import { useState, useRef, useEffect } from "react";
import { Bot, X, RefreshCw } from "lucide-react";
import { Message, sendMessage, initializeNewConversation } from "../../services/chatbot/api.ts";
import ChatMessage from "./ChatMessage.tsx";
import ChatInput from "./ChatInput.tsx";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false); // Changed from true to false
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là Civic Bot. Rất vui được hỗ trợ bạn với các thủ tục hành chính công. Bạn cần giúp đỡ gì ạ?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(message);
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Có lỗi xảy ra";
      const errorResponseMessage: Message = {
        role: "assistant",
        content: `⚠️ ${errorMessage}. Xin hãy thử lại sau.`,
      };
      setMessages((prev) => [...prev, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    initializeNewConversation();
    setMessages([
      {
        role: "assistant",
        content:
          "Xin chào! Tôi là Civic Bot. Rất vui được hỗ trợ bạn với các thủ tục hành chính công. Bạn cần giúp đỡ gì ạ?",
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${
        isOpen ? "w-[400px]" : "w-auto"
      }`}
    >
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white font-inter">
              <Bot size={24} />
              <span className="font-semibold">Civic Bot</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleNewConversation}
                className="text-white hover:text-gray-200 transition-colors p-1"
                title="Bắt đầu cuộc trò chuyện mới"
              >
                <RefreshCw size={20} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-5 w-5 border-4 border-green-500 border-t-transparent rounded-full"></div>
                <span className="text-gray-500">Đang suy nghĩ...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              ref={inputRef}
            />
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors shadow-lg"
        >
          <Bot size={24} />
        </button>
      )}
    </div>
  );
}
