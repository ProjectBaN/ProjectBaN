import React from 'react';
import { Link } from 'react-router-dom';

function HeaderSideMenu() {
  return (
    <div className="sm:w-full flex flew-row gap-MbMedium p-MbSm text-sm font-contents text-gray-500 ">
      <Link to="/">로그인</Link>
      <Link to="/">회원가입</Link>
      <Link to="/">마이페이지</Link>
    </div>
  );
}

export default HeaderSideMenu;
