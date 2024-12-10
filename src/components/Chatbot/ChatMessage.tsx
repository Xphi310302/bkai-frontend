import { Message } from "../../services/chatbot/api";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const renderContent = (content: string) => {
    return (
      <div className="flex flex-col w-full text-left font-inter text-[15px] leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Style headings
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
            // Style paragraphs
            p: ({node, ...props}) => <p className="mb-2" {...props} />,
            // Style lists
            ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-2" {...props} />,
            li: ({node, ...props}) => <li className="mb-1" {...props} />,
            // Style links
            a: ({node, ...props}) => (
              <a 
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-all duration-200 font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            // Style bold and italic text
            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
            // Style code blocks
            code: ({node, inline, ...props}) => (
              inline 
                ? <code className="bg-gray-100 px-1 rounded" {...props} />
                : <code className="block bg-gray-100 p-2 rounded my-2 whitespace-pre-wrap" {...props} />
            ),
            // Style blockquotes
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
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
        className={`max-w-[90%] rounded-lg p-3 font-inter ${
          message.role === "user"
            ? "bg-green-600 text-white [&_a]:text-white [&_a:hover]:text-gray-200 [&_code]:bg-green-700 [&_blockquote]:border-green-400"
            : "bg-teal-100 text-black [&_code]:bg-teal-200 [&_blockquote]:border-teal-300"
        }`}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
