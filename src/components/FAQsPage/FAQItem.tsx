import React, { useState } from "react";
import type { FAQ } from "./types"; // Adjust the import path as necessary

type FAQItemProps = {
  faq: FAQ;
  onVerifyChange: (faqId: string) => void; // Add onVerifyChange prop
};

const FAQItem: React.FC<FAQItemProps> = ({ faq, onVerifyChange }) => {
  const [isAnswerVisible, setAnswerVisible] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(faq.answer);

  const toggleAnswerVisibility = () => {
    setAnswerVisible((prev) => !prev);
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Save the edited answer when exiting edit mode
      faq.answer = editedAnswer; // Update the original FAQ object
    }
    setEditing((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-start w-full p-4 ">
      {" "}
      {/* Container for FAQ item */}
      <div className="flex flex-col w-full">
        {" "}
        {/* Wrapper for question and answer */}
        <span className="font-medium text-green-800">{faq.question}</span>
        {isAnswerVisible && (
          <div className="mt-2">
            {isEditing ? (
              <textarea
                className="w-full p-2 border border-green-300 rounded"
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
              />
            ) : (
              <p className="text-green-700">{faq.answer}</p>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 ml-4">
        {" "}
        {/* Align buttons to the right */}
        <button
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          onClick={toggleAnswerVisibility}
        >
          {isAnswerVisible ? "-" : "+"}
        </button>
        <button
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 whitespace-nowrap"
          onClick={toggleEditMode}
        >
          {isEditing ? "Lưu" : "Chỉnh sửa"}
        </button>
        <input
          type="checkbox"
          checked={faq.verify}
          onChange={() => onVerifyChange(faq.faq_id)} // Call onVerifyChange
          className="ml-2 w-4 h-4" // Increased size
        />
        <label className="text-green-800 ml-1"></label>
      </div>
    </div>
  );
};

export default FAQItem;
