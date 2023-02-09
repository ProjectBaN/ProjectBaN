import React from 'react';

function StaySign() {
  return (
    <div className="max-w-signInContainer flex flex-row items-center px-MbSm  mt-MbLarge">
      <input type="checkbox" name="stayLogin" className="w-4 h-4"></input>
      <span className="text-sm ml-MbSm ">로그인 상태유지</span>
    </div>
  );
}

export default StaySign;
