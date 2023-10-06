import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiLogOutCircle, LogOutImg } from '../../assets';
import { menuItem } from '../../assets/data.demo';
import SideMenuItem from './SideMenuItem.Component';
import { config } from '../../config';
import { clearUser } from '../../redux/slices/user.slice';

const SideMenu = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    // Handle Logout
    try {
      // Also Logout form the Server:
      await axios.get(`${config.BASE_URL}/auth/logout`);

      // clearing the LocalStorage:
      localStorage.removeItem('token');

      navigate('/');

      // Clearing the user Info:
      dispatch(clearUser());

      // Toast:
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main
      className={`${className} w-full h-screen overflow-y-auto min-w-[200px]  bg-theme z-10 bg-slate-900 text-white`}
    >
      <div className='flex justify-center items-center py-6'>
        <span className='border p-3 px-5 rounded text-lg font-normal select-none cursor-pointer'>
          <Link to={'/'}>Trikl Image Generator</Link>
        </span>
      </div>
      {/* Menu Items */}
      <section className='px-3 pt-6 text-white text-xl flex flex-col gap-2'>
        {menuItem?.map((ele) => (
          <SideMenuItem
            key={ele.id}
            text={ele.text}
            icon={ele.icon}
            route={ele.route}
          />
        ))}
        <SideMenuItem
          key={111}
          text={'Log Out'}
          icon={BiLogOutCircle}
          route={'/'}
          onClick={handleLogOut}
        />
      </section>
    </main>
  );
};

export default SideMenu;
