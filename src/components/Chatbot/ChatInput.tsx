import React, { useState, forwardRef } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(({
  onSendMessage,
  isLoading,
}, ref) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex space-x-2">
        <input
          ref={ref}
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          className={`w-full px-3 pt-2 pb-1 rounded-lg border focus:outline-none focus:border-green-500 text-[15px] ${
            isLoading ? "bg-gray-100" : "bg-white"
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex-shrink-0"
          disabled={isLoading}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
});

export default ChatInput;
