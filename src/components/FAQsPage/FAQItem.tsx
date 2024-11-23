import React, { useState } from "react";
import type { FAQ } from "./types"; // Adjust the import path as necessary

type FAQItemProps = {
  faq: FAQ;
  onSave: (updatedFAQ: FAQ) => void;
};

const FAQItem: React.FC<FAQItemProps> = ({ faq, onSave }) => {
  const [isAnswerVisible, setAnswerVisible] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(faq.answer);

  const toggleAnswerVisibility = () => {
    setAnswerVisible((prev) => !prev);
  };

  const toggleEditMode = () => {
    if (isEditing) {
      const updatedFAQ = { ...faq, answer: editedAnswer };
      onSave(updatedFAQ);
      faq.answer = editedAnswer; // Update the original faq.answer with the edited answer
    }
    setEditing((prev) => !prev);
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow border border-green-400">
      <div className="flex justify-between items-center">
        <span className="font-medium text-green-800">{faq.question}</span>
        <div className="flex items-center space-x-2">
          <button
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            onClick={toggleAnswerVisibility}
          >
            {isAnswerVisible ? "-" : "+"}
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={toggleEditMode}
          >
            {isEditing ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>
      </div>
      {isAnswerVisible && (
        <div className="mt-4">
          {isEditing ? (
            <textarea
              className="w-full p-2 border border-green-300 rounded"
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
          ) : (
            <p className="text-green-700">{faq.answer}</p> // This will now show the updated answer
          )}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
