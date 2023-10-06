import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthenticationPage from './pages/AuthenticationPage';
import HomePage from './pages/HomePage';
import PrivateRoutes from './pages/PrivateRoutes';
import PreviousImage from './pages/PreviousImage';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, toggleModal } from './redux/slices/auth.slice';
import { useEffect } from 'react';
import AuthModal from './components/Auth/Modal.Component';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, showModal } = useSelector(selectAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(toggleModal());
    }
  }, [isAuthenticated, dispatch]);
  return (
    <div className='App relative'>
      <ToastContainer />
      <Routes>
        <Route path='/auth' element={<AuthenticationPage />} />
        <Route path='/auth/login' element={<AuthenticationPage />} />
        <Route path='/' element={<HomePage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/previous-images' element={<PreviousImage />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
