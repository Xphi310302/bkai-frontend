import { Message } from "../../services/chatbot/api";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const renderContent = (content: string) => {
    // Split content by markdown links pattern [text](url)
    const parts = content.split(/(\[.*?\]\(.*?\))/);
    
    return (
      <div className="flex flex-col w-full text-left whitespace-pre-wrap">
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
          return <span key={index}>{part}</span>;
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
        className={`max-w-[80%] rounded-lg p-3 ${
          message.role === "user"
            ? "bg-green-600 text-white"
            : "bg-teal-100 text-black"
        }`}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
