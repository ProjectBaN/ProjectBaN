import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import SignupButtons from './SignupButtons';
import SignupContent from './SignupContent';

function Signupbody() {
  const result = useSelector((state) => state);
  const location = useLocation();
  console.log(result);
  console.log(location.state);

  return (
    <main className="max-w-signUpContainer m-auto mt-PCbase px-2 flex flex-col items-center ">
      <SignupContent />
      <SignupButtons />
    </main>
  );
}

export default Signupbody;
