import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setUser } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';

const useSession = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      const { data } = await axios.get(`${config.BASE_URL}/auth/session`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (data.user) {
        dispatch(setUser(data.user));
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Error ', error.message);
      setLoading(false);
    }
  };

  return { loading, getSession };
};

export default useSession;
