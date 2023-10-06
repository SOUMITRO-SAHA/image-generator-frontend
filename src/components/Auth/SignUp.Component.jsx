import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../../common/Button';
import InputBox from '../../common/Input';
import { config } from '../../config';
import { setUser } from '../../redux/slices/user.slice';

const SignUp = ({ isSignUp, setIsSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    const minLength = password.length >= 8;

    // Password must contain at least one capital letter
    const hasUpperCase = /[A-Z]/.test(password);

    // Password must contain at least one small letter
    const hasLowerCase = /[a-z]/.test(password);

    // Password must contain at least one digit
    const hasDigit = /\d/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasDigit;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!(name, email, password, confirmPassword)) {
        toast.error('Please fill all the fields');
        setLoading(false);
        return;
      }

      if (!validatePassword(password)) {
        toast.error(
          'Password must be at least 8 characters long and contain at least one capital letter, one small letter, and one digit'
        );
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Password and Confirm Password must be the same');
        setLoading(false);
        return;
      }

      // Signing Up
      const { data } = await axios.post(`${config.BASE_URL}/auth/register`, {
        name: name,
        email: email,
        password: password,
      });

      if (data.message === 'User already registered, please try login') {
        // Making the Loader false
        setLoading(false);
        setIsSignUp(false);
        toast.warn(data.message);

        // Making all the fields empty again
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else if (data.success) {
        toast.success('Successfully registered');
        dispatch(setUser(data.user));

        // Storing the Token into the LocalStorage
        localStorage.setItem('token', data.token);
        setLoading(false);

        // Now Redirect to Login Page
        navigate('/auth/login');
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center mb-8'>
        {/* Page */}
        <div className='text-2xl font-semibold my-6'>Sign Up</div>

        <div className='flex flex-col gap-5 w-[80%]'>
          {/* Name */}
          <div className='relative'>
            <InputBox
              type={'text'}
              required={true}
              placeholder={'Name'}
              setState={setName}
              state={name}
            />
            {name && (
              <label className='absolute left-4 -top-3 bg-slate-900 rounded-full px-3 text-white'>
                Name
              </label>
            )}
          </div>
          {/* Email */}
          <div className='relative'>
            <InputBox
              type={'text'}
              required={true}
              placeholder={'email'}
              setState={setEmail}
              state={email}
            />
            {email && (
              <label className='absolute left-4 -top-3 bg-slate-900 rounded-full px-3 text-white'>
                Email
              </label>
            )}
          </div>

          {/* Password */}
          <div className='relative'>
            <InputBox
              type={'password'}
              required={true}
              placeholder={'Password'}
              state={password}
              setState={setPassword}
            />

            {password && (
              <label className='absolute left-4 -top-3 bg-slate-900 rounded-full px-3 text-white'>
                Password
              </label>
            )}
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <InputBox
              type={'password'}
              required={true}
              placeholder={'Confirm Password'}
              state={confirmPassword}
              setState={setConfirmPassword}
            />

            {confirmPassword && (
              <label className='absolute left-4 -top-3 bg-slate-900 rounded-full px-3 text-white'>
                Confirm Password
              </label>
            )}
          </div>

          {/* Submit Btn */}
          <Button
            text={loading ? 'Loading...' : 'Sign Up'}
            className='bg-blue-500 font-semibold text-white justify-center'
            onClick={handleSubmit}
          />
        </div>

        <div className='mt-3'>
          Already has an account!{' '}
          <span
            className='underline cursor-pointer'
            onClick={() => setIsSignUp(!isSignUp)}
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
