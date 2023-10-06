import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../common/Button';
import InputBox from '../../common/Input';
import { config } from '../../config';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/user.slice';

const SignIn = ({ state, setState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        toast.error('Please fill all the fields');
        setLoading(false);
        return;
      }

      // Signing Up
      const { data } = await axios.post(`${config.BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      if (data.success) {
        window.localStorage.setItem('token', JSON.stringify(data.token));
        // Making the Loader false:
        toast.success('Login successful');
        setLoading(false);

        // Update the redux:
        dispatch(setUser(data.user));

        // Storing the token in localStorage
        localStorage.setItem('token', data.token);

        navigate('/');
      } else if (data.message === 'Invalid credentials') {
        toast.warn('Invalid credentials');
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center rounded'>
      {/* Page */}
      <div className='text-2xl font-semibold my-6'>Login</div>

      <div className='flex flex-col gap-5 w-[80%] mb-3'>
        {/* Email */}
        <div className='relative'>
          <InputBox
            type={'email'}
            required={true}
            placeholder={'Enter email'}
            setState={setEmail}
            state={email}
          />
          {email && (
            <label className='absolute left-4 -top-3 bg-slate-900 rounded-full px-3 text-white'>
              Email
            </label>
          )}
        </div>
        {/* password */}
        <div className='relative'>
          <InputBox
            type={'password'}
            required={true}
            placeholder={'Enter Password'}
            setState={setPassword}
            state={password}
          />
          {password && (
            <label className='absolute left-4 -top-3 bg-slate-900 rounded-full px-3 text-white'>
              Password
            </label>
          )}
        </div>

        {/* Submit Btn */}
        <Button
          text={loading ? 'Loading...' : 'Log In'}
          className='bg-blue-500 text-white font-semibold justify-center'
          onClick={handleSubmit}
        />
      </div>

      <div className='mb-8'>
        First time here? Please{' '}
        <span
          className='underline cursor-pointer'
          onClick={() => setState(!state)}
        >
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default SignIn;
