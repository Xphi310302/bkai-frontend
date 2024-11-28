
import { Message } from "../../services/chatbot/api";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const renderContent = (content: string) => {
    // Split content by markdown links pattern [text](url)
    const parts = content.split(/(\[.*?\]\(.*?\))/);
    
    return (
      <div className="flex flex-wrap items-start w-full text-left">
        {parts.map((part, index) => {
          // Check if this part is a markdown link
          const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
          
          if (linkMatch) {
            const [_, text, url] = linkMatch;
            return (
              <a
                key={index}
                href={url}
                className="text-blue-600 hover:text-blue-800 font-semibold inline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {text}
              </a>
            );
          }
          
          // Regular text part - preserve whitespace and line breaks
          const lines = part.split('\n').map(line => line.trim().replace(/\s+/g, ' '));
          return (
            <span key={index} className="inline">
              {lines.join(' ')}
            </span>
          );
        })}
      </div>
    );
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
        {renderContent(message.content)}
      </div>
    </div>
  );
}
