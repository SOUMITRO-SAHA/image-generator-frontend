import React, { useState } from 'react';

const RangeBox = ({ className }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [level, Level] = useState(0);

  const handleDuration = (e) => {
    const newValue = parseFloat(e.target.value);
    setCurrentValue(newValue);
  };

  return (
    <input
      type='range'
      max={level}
      value={currentValue}
      onChange={handleDuration}
      step={0.01}
      className={`${className} flex-none`}
    />
  );
};

export default RangeBox;
