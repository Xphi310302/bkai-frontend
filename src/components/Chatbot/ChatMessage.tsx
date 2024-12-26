import { Message } from "../../services/chatbot/api";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from "react";
interface ChatMessageProps {
  message: Message & {
    role: 'user' | 'assistant';
    content: string;
  };
}

export default React.memo(function ChatMessage({ message }: ChatMessageProps) {
  const renderContent = (content: string) => {
    try {
      return (
        <div className="flex flex-col w-full text-left font-inter text-[15px] leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Style headings
              h1: (props) => <h1 className="text-2xl font-bold mb-4" {...props} />,
              h2: (props) => <h2 className="text-xl font-bold mb-3" {...props} />,
              h3: (props) => <h3 className="text-lg font-bold mb-2" {...props} />,
              // Style paragraphs
              p: (props) => <p className="mb-2" {...props} />,
              // Style lists
              ul: (props) => <ul className="list-disc ml-6 mb-2" {...props} />,
              ol: (props) => <ol className="list-decimal ml-6 mb-2" {...props} />,
              li: (props) => <li className="mb-1" {...props} />,
              // Style links
              a: (props) => (
                <a 
                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-all duration-200 font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              // Style bold and italic text
              strong: (props) => <strong className="font-bold" {...props} />,
              em: (props) => <em className="italic" {...props} />,
              // Style code blocks
              code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode; } & React.HTMLProps<HTMLElement>) => (
                inline 
                  ? <code className="bg-gray-100 px-1 rounded" {...props}>{children}</code>
                  : <code className="block bg-gray-100 p-2 rounded my-2 whitespace-pre-wrap" {...props}>{children}</code>
              ),
              // Style blockquotes
              blockquote: (props) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 my-2 italic" {...props} />
              ),
            }}
          >
            {content || ''}
          </ReactMarkdown>
        </div>
      );
    } catch (error) {
      console.error('Error rendering markdown:', error);
      return <div className="text-red-500">Error rendering message content</div>;
    }
  };

  return (
    <div
      role="listitem"
      aria-label={`${message.role} message`}
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[90%] rounded-lg px-3 pt-2 pb-1 font-inter ${
          message.role === "user"
            ? "bg-green-600 text-white [&_a]:text-white [&_a:hover]:text-gray-200 [&_code]:bg-green-700 [&_blockquote]:border-green-400 whitespace-pre-wrap break-words" // Added break-words
            : "bg-teal-100 text-black [&_code]:bg-teal-200 [&_blockquote]:border-teal-300"
        }`}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
});
