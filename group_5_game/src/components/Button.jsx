import React from 'react';
/**
 * Button Component
 * A reusable button component with default styles
 * 
 * 
 * 
 * 
 * @param {* children, onClick, className, disabled
 * } param0 
 * @returns 
 */

const Button = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        bg-[#9333EA] hover:bg-[#7928CA] 
        text-white font-semibold 
        rounded-md 
        transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

