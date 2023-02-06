import React from 'react';
import { signInList } from './SignInList';
import SignInputBox from './SignInputBox';
import StaySign from './StaySign';

function SignForm() {
  return (
    <div className="max-w-signInContainer m-auto">
      {signInList.map((sign) => (
        <SignInputBox sign={sign} key={sign.id} />
      ))}
      <StaySign />
      <button className="mt-MbMedium w-full h-12 bg-black text-white ">로그인</button>
    </div>
  );
}

export default SignForm;
