import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  type = 'button'
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transform transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-105 active:scale-95
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-purple-600 text-white
      hover:from-indigo-700 hover:to-purple-700
      focus:ring-indigo-500 shadow-lg hover:shadow-xl
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500 shadow-md hover:shadow-lg
    `,
    success: `
      bg-gradient-to-r from-green-600 to-emerald-600 text-white
      hover:from-green-700 hover:to-emerald-700
      focus:ring-green-500 shadow-lg hover:shadow-xl
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-pink-600 text-white
      hover:from-red-700 hover:to-pink-700
      focus:ring-red-500 shadow-lg hover:shadow-xl
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const handleClick = async () => {
    if (disabled || loading) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    if (onClick) {
      await onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isClicked ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {loading ? (
        <LoadingSpinner size="sm" color="white" />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default AnimatedButton;
