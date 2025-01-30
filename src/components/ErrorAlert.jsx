import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message, className = '', ...props }) => {
  if (!message) return null;

  return (
    <div
      className={`mb-6 p-4 bg-error/10 text-error rounded-lg border border-error/50 flex items-center gap-3 ${className}`}
      role='alert'
      {...props}
    >
      <AlertCircle className='h-5 w-5 flex-shrink-0' />
      <span>{message}</span>
    </div>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default ErrorAlert;
