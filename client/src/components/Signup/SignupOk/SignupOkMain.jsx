import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignupHeader from '../../common/Signup/SignupHeader';

function SignupOkMain() {
  useEffect(() => {
    // if (!location.state) {
    //   alert('비정상적인 접근입니다.');
    //   navigate('/signup');
    // }

    return () => {};
  });

  return (
    <div>
      <SignupHeader />
      <div className="max-w-signUpContainer mt-PcBase text-center m-auto">
        <img
          className="w-full"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif"
          alt=""
        />
        <p className="font-bold text-xl">회원가입이 완료되었습니다.</p>
        <div className="flex mt-PcBase w-full"></div>
        <Link to={'/'}>
          <button className="w-1/2 h-10 bg-black text-white"> 홈으로</button>
        </Link>
        <Link to={'/'}>
          <button className="w-1/2 h-10 border-2 border-solid border-black">로그인</button>
        </Link>
      </div>
    </div>
  );
}

export default SignupOkMain;
