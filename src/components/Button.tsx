import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
//   onClick: () => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // Ajuste aquí
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
