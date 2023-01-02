import React from 'react';
import SignupButtons from './SignupButtons';
import SignupContent from './SignupContent';

function Signupbody() {
  return (
    <main className="max-w-signUpContainer m-auto mt-PCbase px-2 flex flex-col items-center ">
      <SignupContent />
      <SignupButtons />
    </main>
  );
}

export default Signupbody;
