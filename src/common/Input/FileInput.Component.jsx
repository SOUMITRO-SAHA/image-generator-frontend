import React, { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';

const FileInput = ({
  accept,
  id,
  fileHandleFn,
  placeholder,
  className,
  onClick,
}) => {
  const [file, setFile] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0].name);
    fileHandleFn(e.target.files[0]);
  };

  const onFileSelectedElement = (
    <div className='flex justify-between items-center mx-3'>
      <span>{file}</span>
      <FcCheckmark className='text-xl' />
    </div>
  );

  return (
    <>
      <label
        htmlFor={id}
        className={`${className} grid grid-cols-12 text-center justify-center items-center border-[2px] border-dashed border-black p-2 rounded border-purple-gray text-purple-gray cursor-pointer`}
      >
        <div className='col-span-10 text-theme2 text-lg flex justify-center ml-12'>
          {file ? onFileSelectedElement : placeholder}
        </div>
        <div className='col-span-2'>
          {file ? (
            <button
              type='submit'
              className='flex justify-center items-center p-1 w-full text-white bg-blue-500 rounded hover:shadow-md'
            >
              Submit
            </button>
          ) : (
            <div className='flex justify-end mx-3'>
              <AiOutlineRight className='col-span-1 text-lg' />
            </div>
          )}
        </div>

        <input
          type='file'
          accept={accept}
          id={id}
          onChange={onChange}
          className='hidden'
        />
      </label>
    </>
  );
};

export default FileInput;
