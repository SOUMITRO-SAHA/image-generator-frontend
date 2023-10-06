import React from 'react';
import {
  CiAlignCenterH,
  CiAlignCenterV,
  FaArrowRotateLeft,
  FaArrowRotateRight,
} from '../../assets';
import RangeBox from '../../common/Input/RangeBox.Component';
import Button from '../../common/Button';

const BasicEditOptions = () => {
  const brightnessLevel = 10;
  return (
    <main className='w-full h-full flex justify-center items-center bg-slate-500'>
      <div className=' border-2 rounded bg-white'>
        <div className='grid grid-cols-12  p-6 gap-5'>
          {/* Edit Options */}
          <div className='col-span-5 border rounded p-3 text-lg'>
            {/* Filters */}
            <div className='flex flex-col gap-3 mb-5'>
              <div className='text-gray-500 text-xl'>Filters</div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='border p-2 px-3 rounded text-gray-600 cursor-pointer'>
                  Brightness
                </div>
                <div className='border p-2 px-3 rounded text-gray-600 cursor-pointer'>
                  Grayscale
                </div>
                <div className='border p-2 px-3 rounded text-gray-600 cursor-pointer'>
                  Sepia
                </div>
                <div className='border p-2 px-3 rounded text-gray-600 cursor-pointer'>
                  Saturate
                </div>
                <div className='border p-2 px-3 rounded text-gray-600 cursor-pointer'>
                  Contrast
                </div>
                <div className='border p-2 px-3 rounded text-gray-600 cursor-pointer'>
                  Hue Rotate
                </div>
              </div>
            </div>

            {/* Brightness */}
            <div className='flex flex-col gap-3 mb-5'>
              <div className='flex justify-between text-lg text-gray-500'>
                <div className='text-xl'>Brightness</div>
                <div>{brightnessLevel}</div>
              </div>
              <div>
                <RangeBox className='w-full' />
              </div>
            </div>

            {/* Rotate & Flip */}
            <div className='flex flex-col gap-3'>
              <div className='text-gray-500 text-xl'>Rotate & Flip</div>
              <div className='flex w-full gap-3 justify-between'>
                <div className='border p-3 text-gray-600 rounded cursor-pointer'>
                  <FaArrowRotateLeft />
                </div>
                <div className='border p-3 text-gray-600 rounded cursor-pointer'>
                  <FaArrowRotateRight />
                </div>
                <div className='border p-3 text-gray-600 rounded cursor-pointer'>
                  <CiAlignCenterH />
                </div>
                <div className='border p-3 text-gray-600 rounded cursor-pointer'>
                  <CiAlignCenterV />
                </div>
              </div>
            </div>
          </div>
          {/* Image Preview */}
          <div className='col-span-7 border rounded p-3'></div>
        </div>
        {/* Buttons */}
        <div className='flex justify-between mx-6 my-5'>
          <div className='flex gap-10'>
            <Button text={'Reset'} className='bg-red-500' />
            <Button text={'Save Image'} className='bg-green-400' />
          </div>

          <Button text={'Choose Image'} className='bg-gray-500' />
        </div>
      </div>
    </main>
  );
};

export default BasicEditOptions;
