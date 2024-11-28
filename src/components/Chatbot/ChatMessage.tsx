import ReactMarkdown from "react-markdown";
import { Message } from "../../services/chatbot/api";

interface ChatMessageProps {
  message: Message;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode; // Made children optional
}

export default function ChatMessage({ message }: ChatMessageProps) {
  // Function to process the message content
  const processMessageContent = (content: string) => {
    // Split the content by code blocks
    const parts = content.split(/```markdown\n|\n```/);
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        // Regular text
        return (
          <div key={index} className="whitespace-pre-wrap">
            {part}
          </div>
        );
      } else {
        // Markdown content
        return (
          <ReactMarkdown
            key={index}
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
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">
                  {children}
                </strong>
              ),
            }}
          >
            {part}
          </ReactMarkdown>
        );
      }
    });
  };

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
        {processMessageContent(message.content)}
      </div>
    </div>
  );
}
