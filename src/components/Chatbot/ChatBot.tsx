import { useState, useRef, useEffect } from "react";
import { Bot, Bell, X } from "lucide-react";
import { Message, sendMessage } from "../../services/chatbot/api.ts";
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-[380px] h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-green-600 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="text-white" size={24} />
              <span className="text-white font-semibold">Civic Bot</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="text-white cursor-pointer" size={20} />
              <X
                className="text-white cursor-pointer"
                size={20}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
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
          <ChatInput 
            ref={inputRef}
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
          />
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <Bot size={24} />
        </button>
      )}
    </div>
  );
}
