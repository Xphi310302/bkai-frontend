import React from 'react';

interface ProcessingModalProps {
  show: boolean;
  message: string;
}

const ProcessingModal: React.FC<ProcessingModalProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-lg text-gray-700 text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;
