import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../common/Loader/Loader.Component';
import { isEmpty } from '../utils/isEmpty';
import useSession from '../hooks/session.hook';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, getSession } = useSession();

  useEffect(() => {
    getSession();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (isEmpty(user)) {
    return <Navigate to='/auth' replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
