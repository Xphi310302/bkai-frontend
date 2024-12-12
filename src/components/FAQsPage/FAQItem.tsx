import React, { useState, useEffect } from 'react';
import type { FAQ } from './types';
import { useFAQ } from '../../context/FAQContext';

interface FAQItemProps {
  faq: FAQ;
  onRemove: (faqId: string) => void;
  onVerifyChange: (faqId: string, isVerified: boolean) => void;
  setShowModal: (show: boolean) => void;
  setModalTitle: (title: string) => void;
  setModalMessage: (message: string) => void;
  setModalAction: (action: string) => void;
  setModalCallback: (callback: () => void) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  onRemove,
  onVerifyChange,
  setShowModal,
  setModalTitle,
  setModalMessage,
  setModalAction,
  setModalCallback,
}) => {
  const { updateFAQ } = useFAQ();
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(faq.question);
  const [editedAnswer, setEditedAnswer] = useState(faq.answer);
  const [isVerified, setIsVerified] = useState(faq.is_source);
  const [isExpanded, setExpanded] = useState(true);

  useEffect(() => {
    setIsVerified(faq.is_source);
    setEditedQuestion(faq.question);
    setEditedAnswer(faq.answer);
  }, [faq]);

  const handleEdit = () => {
    if (faq.is_source) {
      setShowModal(true);
      setModalTitle("Cảnh báo");
      setModalMessage("Bạn cần bỏ xác nhận FAQ trước khi chỉnh sửa.");
      setModalAction("warning");
      setModalCallback(() => () => {});
      return;
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedFAQ: FAQ = {
        ...faq,
        question: editedQuestion,
        answer: editedAnswer,
        modified: new Date().toISOString(),
      };
      await updateFAQ(faq.file_id, updatedFAQ);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setShowModal(true);
      setModalTitle("Lỗi");
      setModalMessage("Có lỗi xảy ra khi cập nhật FAQ. Vui lòng thử lại.");
      setModalAction("error");
      setModalCallback(() => () => {});
    }
  };

  const handleCancel = () => {
    setEditedQuestion(faq.question);
    setEditedAnswer(faq.answer);
    setIsEditing(false);
  };

  const handleVerifyChange = () => {
    setShowModal(true);
    if (isVerified) {
      setModalTitle("Bỏ xác nhận");
      setModalMessage("Bạn có chắc chắn muốn bỏ xác nhận FAQ này không?");
      setModalAction("verify");

    } else {
      setModalTitle("Xác nhận");
      setModalMessage("Bạn có chắc chắn muốn xác nhận FAQ này không?");
      setModalAction("verify");
    }
    setModalCallback(() => () => {
      setIsVerified(!isVerified);
      onVerifyChange(faq.faq_id, !isVerified);
    });
  };

  const handleDelete = () => {
    if (faq.is_source) {
      setShowModal(true);
      setModalTitle("Cảnh báo");
      setModalMessage("Bạn cần bỏ xác nhận FAQ trước khi xóa.");
      setModalAction("warning");
      setModalCallback(() => () => {});
      return;
    }
    setShowModal(true);
    setModalTitle("Xóa");
    setModalMessage("Bạn có chắc chắn muốn xóa FAQ này không?");
    setModalAction("delete");
    setModalCallback(() => () => onRemove(faq.faq_id));
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'p-8' : 'p-6'} w-full mx-auto border border-green-300 relative`}>
      <div className="flex flex-col space-y-4 w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex-grow min-w-0">
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
                className="text-xl font-semibold text-green-900 cursor-pointer hover:text-green-700 transition-colors border-b-2 border-green-300 pb-2 truncate"
                onClick={() => setExpanded(!isExpanded)}
                title={faq.question}
              >
                {faq.question}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className={`p-2 rounded-full transition-colors ${
                isEditing
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
              onClick={isEditing ? handleSave : handleEdit}
            >
              {isEditing ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              )}
            </button>
            <button
              className="p-2 rounded-full transition-colors hover:bg-red-100"
              onClick={handleDelete}
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
            {!isEditing && (
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={handleVerifyChange}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 
                    ${isVerified
                      ? 'bg-green-600 border-green-600 group-hover:bg-green-700 group-hover:border-green-700'
                      : 'border-gray-300 group-hover:border-green-400'}`}
                  >
                    {isVerified && (
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
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-green-600">Xác nhận</span>
                </label>
              </div>
            )}
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
              </div>
            ) : (
              <div className="flex">
                <div className="flex-grow min-w-0 text-green-800 whitespace-pre-wrap pl-5 border-l-4 border-green-400 pr-4">
                  {faq.answer}
                </div>
                <div className="w-[180px] flex-shrink-0"></div>
              </div>
            )}
          </div>
        )}

        {/* Edit Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pb-12">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Hủy</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Lưu thay đổi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQItem;
