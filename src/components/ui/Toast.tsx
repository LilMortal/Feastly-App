/**
 * Toast Component
 * A notification component that displays temporary messages to users.
 * Supports different types (success, error, warning, info) with appropriate styling.
 * Automatically disappears after 4 seconds or can be manually dismissed.
 */

import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Toast as ToastType, useToastStore } from '../../stores/toastStore';

const Toast: React.FC<ToastType> = ({ id, type, message }) => {
  const { removeToast } = useToastStore();
  const [isExiting, setIsExiting] = useState(false);
  
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      removeToast(id);
    }, 300);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        removeToast(id);
      }, 300);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [id, removeToast]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-error-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning-500" />;
      default:
        return <Info className="h-4 w-4 text-secondary-500" />;
    }
  };
  
  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success-50 dark:bg-success-900/20';
      case 'error':
        return 'bg-error-50 dark:bg-error-900/20';
      case 'warning':
        return 'bg-warning-50 dark:bg-warning-900/20';
      default:
        return 'bg-secondary-50 dark:bg-secondary-800';
    }
  };
  
  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-success-200 dark:border-success-800';
      case 'error':
        return 'border-error-200 dark:border-error-800';
      case 'warning':
        return 'border-warning-200 dark:border-warning-800';
      default:
        return 'border-secondary-200 dark:border-secondary-700';
    }
  };
  
  return (
    <div
      className={`animate-fade-in w-72 rounded-lg border px-4 py-3 shadow-md transition-opacity duration-300 md:w-80 ${
        getBgColor()
      } ${getBorderColor()} ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <div className="flex">
          <div className="flex-shrink-0 pt-0.5">{getIcon()}</div>
          <div className="ml-3">
            <p className="text-sm text-secondary-900 dark:text-secondary-100">{message}</p>
          </div>
        </div>
        <button
          className="ml-4 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-secondary-400 hover:text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-secondary-500 dark:hover:text-secondary-100"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;