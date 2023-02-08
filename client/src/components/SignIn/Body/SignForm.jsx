import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncLoginUser } from '../../../redux/reducer/loginSlice';
import { signInList } from './SignInList';
import SignInputBox from './SignInputBox';
import StaySign from './StaySign';

function SignForm() {
  const [loginInput, setLoginInput] = useState({ id: '', password: '' });
  const dispatch = useDispatch();
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
    dispatch(asyncLoginUser(body));
  };
  return (
    <div className="max-w-signInContainer flex flex-col  m-auto">
      {signInList.map((sign) => (
        <SignInputBox sign={sign} key={sign.id} OnChange={OnChange} />
      ))}
      <StaySign />
      <button
        className={
          loginInput.id && loginInput.password
            ? 'mt-MbMedium w-full h-14 bg-black text-white rounded-sm '
            : 'mt-MbMedium w-full h-14 bg-gray-300 text-white rounded-sm'
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
