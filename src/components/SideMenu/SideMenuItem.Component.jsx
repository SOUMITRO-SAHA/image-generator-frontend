import React from 'react';
import { Link } from 'react-router-dom';

const SideMenuItem = ({ text, icon, onClick, route }) => {
  return (
    <Link to={route}>
      <div
        className='p-3 rounded flex items-center gap-3 cursor-pointer active:ring-2 hover:bg-blue-500 active:ring-blue-500 select-none'
        onClick={onClick}
      >
        <span className='h-[20px] w-[20px] text-base xl:text-lg'>
          <img src={icon} alt='' />
        </span>
        <span>{text}</span>
      </div>
    </Link>
  );
};

export default SideMenuItem;
