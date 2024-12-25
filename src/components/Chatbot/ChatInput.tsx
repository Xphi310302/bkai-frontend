// src/components/Chatbot/ChatInput.tsx
import React, { useState, forwardRef, useEffect, useRef } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSendMessage, isLoading }, ref) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      onSendMessage(input);
      setInput("");
    };

    // Auto-resize the textarea based on content
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
      }
    }, [input]);

    // Handle Enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        // Check if Enter is pressed without Shift
        handleSubmit(e); // Call the submit handler
      }
    };

    return (
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-2">
          <textarea
            ref={(el) => {
              textareaRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add key down event handler
            placeholder="Nhập câu hỏi của bạn..."
            className={`flex-grow px-3 pt-2 pb-1 rounded-lg border focus:outline-none focus:border-green-500 text-[15px] ${
              isLoading ? "bg-gray-100" : "bg-white"
            }`}
            disabled={isLoading}
            rows={1} // Set initial rows to 1 for single line
            style={{ resize: "none", overflow: "hidden" }} // Prevent resizing and hide scrollbar
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
            style={{ width: "35px", height: "35px" }} // Fixed size for the button
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    );
  }
);

export default ChatInput;
