import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../logout/Logout';

function HeaderSideMenu() {
  const loging = useSelector((state) => state.user.isLogin);

  return (
    <div className="md:flex md:flew-row md:gap-MbMedium md:items-center text-sm font-contents text-gray-500 ">
      {loging ? (
        <div className="flex gap-MbMedium">
          <Logout />
          <Link to="/">마이페이지</Link>
        </div>
      ) : (
        <div className="flex gap-MbMedium ">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </div>
  );
}

export default HeaderSideMenu;
