import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncLoginUser, asyncLogoutUser } from '../../../redux/reducer/loginSlice';
import { signInList } from './SignInList';
import SignInputBox from './SignInputBox';
import StaySign from './StaySign';

function SignForm() {
  const [loginInput, setLoginInput] = useState({ id: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user.status);

  const OnChange = (e) => {
    e.preventDefault();
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    let body = {
      data: {
        id: loginInput.id,
        password: loginInput.password,
      },
    };
    dispatch(asyncLoginUser(body)).then((result) => {
      if (result.payload) {
        navigate('/');
      } else {
      }
    });
  };

  return (
    <div className="max-w-signInContainer flex flex-col  m-auto">
      {signInList.map((sign) => (
        <SignInputBox sign={sign} key={sign.id} OnChange={OnChange} />
      ))}
      <StaySign />
      {status === 'fail' && <p className="text-red-500 text-sm">아이디 및 비밀번호가 존재하지않습니다.</p>}
      <button
        className={
          loginInput.id && loginInput.password
            ? 'mt-MbMedium w-full h-14 bg-black text-white rounded-sm px-MbSm'
            : 'mt-MbMedium w-full h-14 bg-gray-300 text-white rounded-sm px-MbSm'
        }
        disabled={loginInput.id && loginInput.password ? false : true}
        onClick={onClick}
      >
        로그인
      </button>
    </div>
  );
}
export default SignForm;
