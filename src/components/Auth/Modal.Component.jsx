import React, { useState } from 'react';
import SignUp from './SignUp.Component';
import SignIn from './SignIn.Components';

const AuthModal = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className='absolute h-screen w-screen flex justify-center items-center bg-transparent backdrop:blur-md overflow-hidden'>
      <section className='w-[500px] border p-3 bg-white rounded'>
        {isSignUp ? (
          <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        ) : (
          <SignIn state={isSignUp} setState={setIsSignUp} />
        )}
      </section>
    </main>
  );
};

export default AuthModal;
