import React from 'react';

const Button = ({ text, onClick, disabled, className, icon }) => {
  return (
    <div
      onClick={onClick}
      disabled={disabled}
      className={`${className} border-2 border-white p-3 rounded text-center text-white font-normal cursor-pointer flex items-center gap-3 select-none`}
    >
      <span>{text}</span>
      <span className='text-3xl'>{icon && icon}</span>
    </div>
  );
};

export default Button;
