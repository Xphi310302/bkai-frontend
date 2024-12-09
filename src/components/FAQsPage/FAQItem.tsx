import React, { useState, useEffect } from "react";
import type { FAQ } from "./types";

type FAQItemProps = {
  faq: FAQ;
  onRemove: (faqId: string) => void;
  onVerifyChange?: (faqId: string, isVerified: boolean) => void;
};

const FAQItem: React.FC<FAQItemProps> = ({ faq, onRemove, onVerifyChange }) => {
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
      // Update with new schema
      const updatedFAQ: FAQ = {
        ...faq,
        question: editedQuestion,
        answer: editedAnswer,
        modified: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
      };
      
      // Here you would typically make an API call to save the changes
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
    <div className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'p-8' : 'p-6'} w-full mx-auto border border-green-300`}>
      <div className="flex space-x-6 w-full">
        {/* Verify Column */}
        <div className="flex flex-col items-center pt-2 w-16">
          <label className="inline-flex flex-col items-center cursor-pointer group w-full">
            <div className="flex flex-col items-center">
              <input
                type="checkbox"
                checked={faq.is_source}
                onChange={(e) => onVerifyChange?.(faq.faq_id, e.target.checked)}
                className="hidden"
              />
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 
                ${faq.is_source 
                  ? 'bg-blue-600 border-blue-600 group-hover:bg-blue-700 group-hover:border-blue-700' 
                  : 'border-gray-300 group-hover:border-blue-400'}`}
              >
                {faq.is_source && (
                  <svg 
                    className="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="mt-1.5 text-xs text-gray-500 group-hover:text-blue-600 text-center whitespace-nowrap">Xác nhận</span>
            </div>
          </label>
        </div>

        {/* Main Content Column */}
        <div className="flex flex-col space-y-4 flex-grow">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {isEditing ? (
                <textarea
                  className="w-full p-4 border border-green-400 rounded-lg focus:ring-4 focus:ring-green-600 focus:border-transparent resize-none text-green-900 font-semibold"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  rows={3}
                  placeholder="Enter question..."
                />
              ) : (
                <div 
                  className="text-xl font-semibold text-green-900 cursor-pointer hover:text-green-700 transition-colors border-b-2 border-green-300 pb-2"
                  onClick={() => setExpanded(!isExpanded)}
                >
                  {faq.question}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                className={`p-2 rounded-full transition-colors ${
                  isEditing 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                onClick={() => !isSaving && (isEditing ? handleSave() : setEditing(true))}
                disabled={isSaving}
              >
                {isEditing ? (
                  isSaving ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                )}
              </button>
              <button
                className="p-2 rounded-full transition-colors hover:bg-red-100"
                onClick={() => onRemove(faq.faq_id)}
                title="Xóa FAQ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
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
                    className="w-full p-5 border border-green-400 rounded-lg focus:ring-4 focus:ring-green-600 focus:border-transparent min-h-[200px] text-green-800"
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    placeholder="Enter answer..."
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      className="px-5 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
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
                <div className="text-green-800 whitespace-pre-wrap pl-5 border-l-4 border-green-400">
                  {faq.answer}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
