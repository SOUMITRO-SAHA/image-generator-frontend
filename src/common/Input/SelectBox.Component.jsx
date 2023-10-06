import React from 'react';

/**
 *
 * @param {*} name=String, options=[], inValue=""
 * If inValue is id => pass the id of the option into the value,
 * If inValue is option name => pass the name of the option
 * @returns
 */

const SelectBox = ({ state, setState, name, options, className }) => {
  return (
    <div>
      <select
        className={`${className}  w-full p-1 border text-gray-600 outline-none rounded`}
        name={name}
        id={`${name}.{new Date()}`}
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
