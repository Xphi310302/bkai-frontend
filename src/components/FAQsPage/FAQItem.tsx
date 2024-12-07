import React, { useState, useEffect } from "react";
import type { FAQ } from "./types";

type FAQItemProps = {
  faq: FAQ;
  onRemove: (faqId: string) => void;
};

const FAQItem: React.FC<FAQItemProps> = ({ faq, onRemove }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(faq.answer);
  const [editedQuestion, setEditedQuestion] = useState(faq.question);
  const [isExpanded, setExpanded] = useState(true);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    setEditedAnswer(faq.answer);
    setEditedQuestion(faq.question);
  }, [faq]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Here you would typically make an API call to save the changes
      faq.answer = editedAnswer;
      faq.question = editedQuestion;
      setEditing(false);
    } catch (error) {
      console.error('Error saving FAQ:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedAnswer(faq.answer);
    setEditedQuestion(faq.question);
    setEditing(false);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'p-8' : 'p-6'} w-full mx-auto border border-gray-300`}>
      <div className="flex flex-col space-y-4 w-full">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {isEditing ? (
              <textarea
                className="w-full p-4 border border-gray-400 rounded-lg focus:ring-4 focus:ring-gray-600 focus:border-transparent resize-none text-gray-900 font-semibold"
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                rows={3}
                placeholder="Enter question..."
              />
            ) : (
              <div 
                className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors border-b-2 border-gray-300 pb-2"
                onClick={() => setExpanded(!isExpanded)}
              >
                {faq.question}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3 ml-5">
            <button
              className={`p-2 rounded-full transition-colors ${
                isEditing 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => !isSaving && (isEditing ? handleSave() : setEditing(true))}
              disabled={isSaving}
              title={isEditing ? "Lưu" : "Chỉnh sửa"}
            >
              {isEditing ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              )}
            </button>
            <button
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={() => onRemove(faq.faq_id)}
              title="Xóa FAQ"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Answer Section */}
        {isExpanded && (
          <div className="mt-4">
            {isEditing ? (
              <div className="space-y-6">
                <textarea
                  className="w-full p-5 border border-gray-400 rounded-lg focus:ring-4 focus:ring-gray-600 focus:border-transparent min-h-[200px] text-gray-800"
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  placeholder="Enter answer..."
                />
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    className={`px-5 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors flex items-center space-x-3 ${
                      isSaving ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Đang lưu...</span>
                      </>
                    ) : (
                      'Lưu thay đổi'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-800 whitespace-pre-wrap pl-5 border-l-4 border-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQItem;
