import React from 'react';
import Editor from '../components/Editor';
import SideMenu from '../components/SideMenu/SideMenu.Component';

const HomePage = () => {
  return (
    <main className='h-screen w-screen'>
      <section className='grid grid-cols-12'>
        <div className='col-span-3 xl:col-span-2 bg-slate-900'>
          {/* Side Menu */}
          <SideMenu />
        </div>

        <div className='col-span-9 xl:col-span-10'>
          {/* Upload Image Section */}
          <Editor />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
