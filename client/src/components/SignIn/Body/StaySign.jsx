import React from 'react';

function StaySign() {
  return (
    <div className="mt-MbLarge px-MbMedium">
      <input type="checkbox" name="stayLogin"></input>
      <span className="text-sm ml-MbSm">로그인 상태유지</span>
    </div>
  );
}

export default StaySign;
