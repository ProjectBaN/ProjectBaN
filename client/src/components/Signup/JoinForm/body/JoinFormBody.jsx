import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const idRegex = /^[0-9a-zA-Z]{3,12}$/;

function JoinFormBody() {
  const location = useLocation();
  const navigate = useNavigate();

  const [input, setInput] = useState({ id: '', password: '', passwordConfirm: '' });
  const [warning, setWarning] = useState({ id: '', password: '', passwordConfirm: '' });

  const [visiblePW, setVisiblePW] = useState(false);

  useEffect(() => {
    if (!location.state) {
      alert('비정상적인 접근입니다.');
      navigate('/signup');
    }
    idCheck();
    passwordConfirmCheck();

    return () => {};
  });

  const OnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const idCheck = () => {
    if (input.id.length === 0 && warning.id.length !== 0) {
      setWarning({ ...warning, id: '' });
    }
    if (input.id.length > 0 && !idRegex.test(input.id) && warning.id.length === 0) {
      console.log('실행됨');
      setWarning({ ...warning, id: '아이디는 3~16자리 영문과 숫자를 적어주십시오' });
    }
    if (input.id.length > 0 && idRegex.test(input.id) && warning.id.length !== 0) {
      setWarning({ ...warning, id: '' });
    }
  };

  const visiblePassWard = (event) => {
    event.preventDefault();
    setVisiblePW((state) => !state);
  };

  const passwordConfirmCheck = () => {
    if (input.password.length === 0 && warning.password.length !== 0) {
      setWarning({ ...warning, passwordConfirm: '' });
    }
    if (input.passwordConfirm.length === 0 && warning.password.length !== 0) {
      setWarning({ ...warning, passwordConfirm: '' });
    }

    if (
      input.password !== input.passwordConfirm &&
      warning.passwordConfirm.length === 0 &&
      input.password.length !== 0 &&
      input.passwordConfirm.length !== 0
    ) {
      console.log('비밀번호가 같지 않습니다.');
      setWarning({ ...warning, passwordConfirm: '비밀번호가 같지않습니다.' });
    }
    if (
      input.password === input.passwordConfirm &&
      warning.passwordConfirm.length !== 0 &&
      input.password.length !== 0 &&
      input.passwordConfirm !== 0
    ) {
      console.log('비밀번호가 같습니다.');
      setWarning({ ...warning, passwordConfirm: '' });
    }
  };

  const blurTest = () => {};
  return (
    <main className="max-w-signUpContainer m-auto mt-PcBase flex flex-col items-center">
      <form className="w-full" action="">
        <li className="mt-PcMd">
          <p className="font-bold">아이디</p>
          <input
            type="text"
            name="id"
            className={
              `${warning.id ? 'focus:ring-red-600 focus:border-red-600 ' : ' focus:ring-black focus:border-black '}` +
              'w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none '
            }
            placeholder="아이디를 입력하세요"
            value={input.id}
            onChange={OnChange}
            onBlur={blurTest}
          ></input>
          {warning.id && <p className="mt-PcSm text-red-600">{warning.id}</p>}
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">비밀번호</p>
          <div className="relative w-full h-11 flex items-center mt-PcSm border-solid border-2  rounded-sm  border-gray-300 focus-within:ring-black focus-within:border-black  focus-within:outline-none">
            <input
              type={visiblePW ? 'text' : 'password'}
              name="password"
              className="relative w-full p-2.5 text-sm focus:border-none focus:outline-none"
              placeholder="비밀번호를 입력하세요"
              value={input.password}
              onChange={OnChange}
            ></input>
            <button className="text-sm right-0 top-0 h-full w-20" onClick={visiblePassWard}>
              {visiblePW ? '눈감기' : '눈뜨기'}
            </button>
          </div>
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">비밀번호 확인</p>
          <div
            className={
              `${
                warning.passwordConfirm
                  ? 'focus-within:ring-red-600 focus-within:border-red-600 '
                  : 'focus-within:ring-black focus-within:border-black '
              }` +
              'relative w-full h-11 flex items-center mt-PcSm border-solid border-2  rounded-sm  border-gray-300  focus-within:outline-none'
            }
          >
            <input
              type={visiblePW ? 'text' : 'password'}
              name="passwordConfirm"
              className="relative w-full p-2.5 text-sm focus:border-none focus:outline-none"
              placeholder="비밀번호를 입력하세요"
              value={input.passwordConfirm}
              onChange={OnChange}
            ></input>
            <button className="text-sm right-0 top-0 h-full w-20" onClick={visiblePassWard}>
              {visiblePW ? '눈감기' : '눈뜨기'}
            </button>
          </div>
          {warning.passwordConfirm && <p className="mt-PcSm text-red-500">{warning.passwordConfirm}</p>}
        </li>
        <li className="mt-PcMd">
          <p className="font-bold">성명</p>
          <input
            type="text"
            className="w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm focus:ring-black focus:border-black border-gray-300  focus:outline-none "
            placeholder="성함을 입력하세요"
          ></input>
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">휴대폰번호</p>
          <input
            type="text"
            className="w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm focus:ring-black focus:border-black border-gray-300  focus:outline-none "
            placeholder="휴대전화 번호를 입력하세요"
          ></input>
        </li>
      </form>
      <button className="w-full h-20 mt-PcBase bg-black text-white" type="submit" value={'서브밋'}>
        회원 가입 하기
      </button>
    </main>
  );
}

export default JoinFormBody;
