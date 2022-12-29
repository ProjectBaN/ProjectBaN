import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const idLengthRegex = /^.{4,12}$/;
const idRegex = /^[0-9a-zA-Z]{3,12}$/;

function JoinFormBody() {
  const location = useLocation();
  const navigate = useNavigate();

  const [input, setInput] = useState({ id: '' });
  const [warning, setWarning] = useState({ id: '' });

  useEffect(() => {
    if (!location.state) {
      alert('비정상적인 접근입니다.');
      navigate('/signup');
    }
    idCheck();

    return () => {};
  });

  const idOnChange = (e) => {
    setInput({ ...input, id: e.target.value });
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

  const blurTest = () => {};
  return (
    <main className="max-w-signUpContainer m-auto mt-PcBase flex flex-col items-center">
      <p>회원가입</p>
      <form className="w-full" action="">
        <li className="mt-PcMd">
          <p>아이디</p>
          <input
            type="text"
            className={
              `${warning.id && 'focus:ring-red-600 focus:border-red-600  '}` +
              'w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm focus:ring-black focus:border-black border-gray-300  focus:outline-none '
            }
            placeholder="아이디를 입력하세요"
            value={input.id}
            onChange={idOnChange}
            onBlur={blurTest}
          ></input>
          {warning.id && <p>{warning.id}</p>}
        </li>
        <li className="mt-PcMd">
          <p>비밀번호</p>
          <input
            type="text"
            className="w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm focus:ring-black focus:border-black border-gray-300  focus:outline-none "
            placeholder="아이디를 입력하세요"
          ></input>
        </li>
        <li className="mt-PcMd">
          <p>비밀번호 확인</p>
          <input
            type="text"
            className="w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm focus:ring-black focus:border-black border-gray-300  focus:outline-none "
            placeholder="아이디를 입력하세요"
          ></input>
        </li>
        <li className="mt-PcMd">
          <p>성명</p>
          <input
            type="text"
            className="w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm focus:ring-black focus:border-black border-gray-300  focus:outline-none "
            placeholder="아이디를 입력하세요"
          ></input>
        </li>
      </form>
    </main>
  );
}

export default JoinFormBody;
