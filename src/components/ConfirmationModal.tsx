import React from "react";

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  message: string;
  action: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  title,
  message,
  action,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  const getActionColor = () => {
    switch (action) {
      case 'delete':
        return 'bg-red-600 hover:bg-red-700';
      case 'verify':
      case 'update-all':
        return 'bg-green-600 hover:bg-green-700';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'delete':
        return 'Xóa';
      case 'verify':
        return 'Xác nhận';
      case 'update-all':
        return 'Cập nhật';
      case 'warning':
        return 'Đã hiểu';
      default:
        return 'Xác nhận';
    }
  };

  const getTitleColor = () => {
    switch (action) {
      case 'delete':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className={`text-2xl font-semibold mb-4 ${getTitleColor()}`}>{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          {action !== 'warning' && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Hủy bỏ
            </button>
          )}
          <button
            onClick={action === 'warning' ? onClose : onConfirm}
            className={`px-4 py-2 text-white rounded transition-colors ${getActionColor()}`}
          >
            {getActionText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
