import React from 'react';
import SideMenu from '../components/SideMenu/SideMenu.Component';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <main className='h-screen w-screen overflow-hidden'>
      <section className='grid grid-cols-12'>
        <div className='col-span-3 xl:col-span-2 bg-slate-900'>
          {/* Side Menu */}
          <SideMenu />
        </div>

        <div className='col-span-9 xl:col-span-10 flex justify-center items-center text-3xl'>
          {/* Upload Image Section */}
          <div className='flex flex-col gap-6 bg-slate-300 p-8 rounded'>
            <div> User Name: {user.name}</div>
            <div> Email: {user.name}</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
