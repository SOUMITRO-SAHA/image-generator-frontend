import axios from 'axios';
import React, { useState } from 'react';
import { config } from '../config';
import { toast } from 'react-toastify';
import SideMenu from '../components/SideMenu/SideMenu.Component';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PreviousImage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [imagesArray, setImagesArray] = useState([]);

  const getAllImages = async () => {
    setLoading(loading);
    try {
      const { data } = await axios.get(
        `${config.BASE_URL}/images/user/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (data.success) {
        setImagesArray(data.images);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // Side Effect
  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <main className='h-screen w-screen overflow-hidden'>
      <section className='grid grid-cols-12'>
        <div className='col-span-3 xl:col-span-2 bg-slate-900'>
          {/* Side Menu */}
          <SideMenu />
        </div>

        <div className='col-span-9 xl:col-span-10'>
          {/* Table of Images */}
          <div className='mx-8 m-6 grid grid-cols-12 gap-6 h-full overflow-y-auto'>
            {imagesArray?.map(({ _id, url, createdAt }, idx) => {
              const imgPath = url.split('uploads');
              console.log(url);
              return (
                <div
                  key={idx}
                  className='h-[200px] col-span-4 bg-green-50 rounded-lg'
                >
                  <img src={url} alt={`Img-${_id}`} className='h-10 w-10' />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PreviousImage;
