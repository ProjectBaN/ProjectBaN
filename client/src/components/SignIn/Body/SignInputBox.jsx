import React from 'react';

function SignInputBox({ sign, OnChange }) {
  return (
    <div className="w-full md:max-w-signInContainer flex flex-col justify-center px-MbSm  m-auto">
      <span className="mt-MbMedium text-sm font-title font-bold">{sign.title}</span>
      <input
        type={sign.type}
        name={sign.name}
        placeholder={sign.placeHolder}
        className="mt-MbSm h-12 pl-MbSm border-2 border-gray-300 focus:outline-none focus:border-black"
        onChange={OnChange}
      ></input>
    </div>
  );
}

export default SignInputBox;
