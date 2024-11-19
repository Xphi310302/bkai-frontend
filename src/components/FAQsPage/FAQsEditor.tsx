import React, { useState } from "react";
import { updateFAQ } from "../../pages/FAQsPage/api";
import type { FAQ } from "./types";

interface FAQEditorProps {
  faq: FAQ;
  onSave: (updatedFAQ: FAQ) => void;
}

const FAQEditor: React.FC<FAQEditorProps> = ({ faq, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>(faq.question);
  const [answer, setAnswer] = useState<string>(faq.answer);

  const toggleEdit = async () => {
    if (isEditing) {
      await saveChanges();
    } else {
      setIsEditing(true);
    }
  };

  const saveChanges = async () => {
    const updatedFaq: FAQ = { ...faq, question, answer };
    try {
      await updateFAQ(updatedFaq);
      onSave(updatedFaq);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save FAQ:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <div className="faq-item" data-id={faq.id}>
      <div className="faq-question">
        {isEditing ? (
          <input
            className="faq-edit-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        ) : (
          <span className="faq-question-text">{faq.question}</span>
        )}
        <div className="faq-controls">
          <button className="faq-edit-btn" onClick={toggleEdit}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          className="faq-edit-textarea"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      ) : (
        <div className="faq-answer">{faq.answer}</div>
      )}
    </div>
  );
};

export default FAQEditor;
