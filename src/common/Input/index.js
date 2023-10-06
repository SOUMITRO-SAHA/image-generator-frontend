import React from 'react';

const InputComponent = ({
  type,
  state,
  setState,
  placeholder,
  required,
  className,
}) => {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={`${className} w-full border-[3px] border-purple-gray p-3 rounded bg-transparent placeholder:text-purple-gray outline-none text-slate-600 `}
    />
  );
};

export default InputComponent;
