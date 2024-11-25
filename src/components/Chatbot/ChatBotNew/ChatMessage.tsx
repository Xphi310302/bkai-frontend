import ReactMarkdown from "react-markdown";
import { Message } from "../../../services/chatbot/api";

interface ChatMessageProps {
  message: Message;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode; // Made children optional
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.role === "user"
            ? "bg-green-600 text-white"
            : "bg-cyan-100 text-gray-800"
        }`}
      >
        <ReactMarkdown
          className="prose prose-sm max-w-none"
          components={{
            code: ({ inline, className, children }: CodeProps) => (
              <code
                className={`${className} ${
                  inline
                    ? "bg-opacity-20 bg-gray-800 px-1 rounded"
                    : "block bg-gray-800 bg-opacity-10 p-2 rounded-lg"
                }`}
              >
                {children}
              </code>
            ),
            link: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  {children}
                </table>
              </div>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
