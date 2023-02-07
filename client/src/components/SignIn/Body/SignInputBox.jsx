import React from 'react';

function SignInputBox({ sign }) {
  return (
    <div className="w-full flex flex-col justify-center px-MbMedium">
      <span className="mt-MbBase text-base font-bold">{sign.title}</span>
      <input
        type="text"
        name={sign.name}
        placeholder={sign.placeHolder}
        className="mt-MbSm h-8 border-b-2 border-b-gray-300 focus:outline-none focus:border-b-black"
      ></input>
    </div>
  );
}

export default SignInputBox;
