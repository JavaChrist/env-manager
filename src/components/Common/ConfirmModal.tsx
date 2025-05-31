import { useEffect } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  type = 'danger',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  // Gestion de la fermeture avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100 dark:bg-red-900/50',
          iconColor: 'text-red-600 dark:text-red-400',
          confirmBtn: 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:ring-red-500 dark:focus:ring-red-400',
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-100 dark:bg-yellow-900/50',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          confirmBtn: 'bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-700 dark:hover:bg-yellow-600 focus:ring-yellow-500 dark:focus:ring-yellow-400',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100 dark:bg-blue-900/50',
          iconColor: 'text-blue-600 dark:text-blue-400',
          confirmBtn: 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400',
        };
      default:
        return {
          iconBg: 'bg-red-100 dark:bg-red-900/50',
          iconColor: 'text-red-600 dark:text-red-400',
          confirmBtn: 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:ring-red-500 dark:focus:ring-red-400',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-900/50 w-full max-w-md transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start">
            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${styles.iconBg} sm:mx-0 sm:h-10 sm:w-10`}>
              {type === 'danger' && (
                <svg className={`h-6 w-6 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
              {type === 'warning' && (
                <svg className={`h-6 w-6 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
              {type === 'info' && (
                <svg className={`h-6 w-6 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="mt-0 ml-4 text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-3 sm:flex sm:flex-row-reverse rounded-b-xl border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            onClick={onConfirm}
            className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 ${styles.confirmBtn}`}
          >
            {confirmText}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}; 