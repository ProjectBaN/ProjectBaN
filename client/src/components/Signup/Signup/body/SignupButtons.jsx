import React from 'react';
import { Link } from 'react-router-dom';

function SignupButtons() {
  return (
    <div className="w-full mt-MbSm text-center">
      <Link to={'/signup/term'}>
        <button className="w-2/3 h-12 rounded-sm shadow-customShadow  bg-neutral-600 text-white ">
          Git 깃허브 회원가입
        </button>
      </Link>
      <button className="w-2/3 h-12 rounded-sm shadow-customShadow  bg-green-600 text-white">
        N 네이버로 시작하기
      </button>
    </div>
  );
}

export default SignupButtons;
