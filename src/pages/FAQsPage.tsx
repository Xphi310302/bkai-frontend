import React from "react";

const FAQsPage: React.FC = () => {
  const faqs = [
    {
      question: "What is Civic Bot?",
      answer:
        "Civic Bot is an intelligent chatbot designed to assist users in navigating administrative procedures and accessing public services.",
    },
    {
      question: "How do I use Civic Bot?",
      answer:
        "You can interact with Civic Bot by asking questions related to administrative procedures.",
    },
    {
      question: "Where can I find more information?",
      answer:
        "You can find more information on our website or by contacting our support.",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-white to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Frequently Asked Questions
      </h1>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-semibold">{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;
