import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  action?: 'warning' | 'confirm';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  action = 'confirm'
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black opacity-40" onClick={handleClose}></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="mb-4">
            <h3 className={`text-lg font-semibold ${action === 'warning' ? 'text-red-600' : 'text-gray-900'}`}>{title}</h3>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {cancelText}
            </button>
            {action === 'confirm' && (
              <button
                onClick={() => {
                  onConfirm();
                  handleClose();
                }}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
