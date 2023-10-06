import React, { useState } from 'react';
import SignUp from '../components/Auth/SignUp.Component';
import SignIn from '../components/Auth/SignIn.Components';

const AuthenticationPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className='h-screen w-screen flex justify-center items-center bg-slate-700'>
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

export default AuthenticationPage;
