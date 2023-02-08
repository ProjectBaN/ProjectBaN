import React from 'react';
import SignForm from './Body/SignForm';
import SignInHeader from './Header/SignInHeader';

function SignInMain() {
  return (
    <main className="mt-MbBase">
      <SignInHeader />
      <SignForm />
    </main>
  );
}

export default SignInMain;
