import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { register } from '../../../../redux/reducer/registerSlice';
import GenderList from './GenderList';

const idRegex = /^[0-9a-zA-Z]{3,12}$/;
const nameRegex = /^[가-힣a-zA-Z]{2,10}$/;
const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const phoneRegex = /^01[0179][0-9]{7,8}$/;

const genderList = [
  {
    idx: 0,
    title: '남자',
    value: 'M',
  },
  {
    idx: 1,
    title: '여자',
    value: 'W',
  },
];

function JoinFormBody() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const testRedux = useSelector((state) => state.user.registerState);

  console.log(location.state);
  const [input, setInput] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
    addr: '',
    age: '',
    gender: '',
  });
  const [warning, setWarning] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
    addr: '',
    age: '',
    gender: '',
  });
  const [submitWarning, setSubmitWarning] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
    addr: '',
    age: '',
    gender: '',
  });
  const [visiblePW, setVisiblePW] = useState(false);

  useEffect(() => {
    if (!location.state) {
      alert('비정상적인 접근입니다.');
      navigate('/signup');
    }
    regexCheck('id', idRegex, '아이디는 3~16자리 영문과 숫자를 적어주십시오');
    passwordConfirmCheck();
    regexCheck('name', nameRegex, '성함은 영문또는 한글로 작성해주세요');
    regexCheck('email', emailRegex, '올바른 이메일 형식을 적어주세요');
    regexCheck('phone', phoneRegex, '올바른 번호를 적어주세요');
    return () => {};
  });

  const OnChange = (e) => {
    const checkboxes = document.getElementsByName('gender');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        checkboxes[i].checked = false;
      }
    }
    setInput({ ...input, [e.target.name]: e.target.value });
    setSubmitWarning({ ...submitWarning, [e.target.name]: '' });
  };

  const regexCheck = (check, regex, warn) => {
    if (input[check].length === 0 && warning[check].length !== 0) {
      setWarning({ ...warning, [check]: '' });
    }
    if (input[check].length > 0 && !regex.test(input[check]) && warning[check].length === 0) {
      setWarning({ ...warning, [check]: warn });
    }
    if (input[check].length > 0 && regex.test(input[check]) && warning[check].length !== 0) {
      setWarning({ ...warning, [check]: '' });
    }
  };

  const visiblePassWard = (event) => {
    event.preventDefault();
    setVisiblePW((state) => !state);
  };

  const passwordConfirmCheck = () => {
    if (input.password.length === 0 && warning.passwordConfirm.length !== 0) {
      setWarning({ ...warning, passwordConfirm: '' });
    }
    if (input.passwordConfirm.length === 0 && warning.passwordConfirm.length !== 0) {
      setWarning({ ...warning, passwordConfirm: '' });
    }

    if (
      input.password !== input.passwordConfirm &&
      warning.passwordConfirm.length === 0 &&
      input.password.length !== 0 &&
      input.passwordConfirm.length !== 0
    ) {
      setWarning({ ...warning, passwordConfirm: '비밀번호가 같지않습니다.' });
    }
    if (
      input.password === input.passwordConfirm &&
      warning.passwordConfirm.length !== 0 &&
      input.password.length !== 0 &&
      input.passwordConfirm !== 0
    ) {
      setWarning({ ...warning, passwordConfirm: '' });
    }
  };

  // id: '', password: '', passwordConfirm: '', name: '', email: '', phone: ''

  const submitCheck = (check, regex) => {
    if (!input[check] || !regex.test(input[check])) {
      return '다시 입력해주세요';
    } else {
      return '';
    }
  };

  // 리덕스로 api 서버 통신후 ok페이지로 state(성공,실패) 전달하기
  const submit = () => {
    const id = submitCheck('id', idRegex);
    const email = submitCheck('email', emailRegex);
    const name = submitCheck('name', nameRegex);
    const phone = submitCheck('phone', phoneRegex);
    setSubmitWarning({ ...submitWarning, email, id, name, phone });
    if (id || email || name || phone) {
      return;
    } else {
      const registerState = { input, term: location.state };
      dispatch(register(registerState));
    }

    // let body = {
    //   data: {
    //     id: testRedux.input.id,
    //     password: testRedux.input.password,
    //     name: testRedux.input.name,
    //     email: testRedux.input.email,
    //     phone: testRedux.input.phone,
    //     addr: testRedux.input.addr,
    //     age: testRedux.input.age,
    //     gender: testRedux.input.gender,
    //     termAge: 'T',
    //     termUse: 'T',
    //     termInfo: 'T',
    //     termEmailAd: 'F',
    //     termPrivateUse: 'F',
    //     termAppPush: 'F',
    //   },
    // };
    // const names = axios
    //   .post('http://localhost:8000/auth/signup', body, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //   })
    //   .catch((err) => console.log(err));
  };
  // 아이디 중복체크

  const blurTest = () => {};
  return (
    <main className="max-w-signUpContainer m-auto mt-MbBase flex flex-col items-center">
      <form className="w-full px-2" action="">
        <li className="mt-MbSm">
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
          {submitWarning.id && <p className="mt-PcSm text-red-600">{submitWarning.id}</p>}
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
            name="name"
            value={input.name}
            onChange={OnChange}
            className={
              `${warning.name ? 'focus:ring-red-600 focus:border-red-600 ' : ' focus:ring-black focus:border-black '}` +
              'w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none '
            }
            placeholder="성함을 입력하세요"
          ></input>
          {warning.name && <p className="mt-PcSm text-red-500">{warning.name}</p>}
          {submitWarning.name && <p className="mt-PcSm text-red-600">{submitWarning.name}</p>}
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">이메일</p>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={OnChange}
            className={
              `${
                warning.email ? 'focus:ring-red-600 focus:border-red-600 ' : ' focus:ring-black focus:border-black '
              }` + 'w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none '
            }
            placeholder="이메일을 입력하세요(ex:aaaa@aaaa.aa)"
          ></input>
          {warning.email && <p className="mt-PcSm text-red-500">{warning.email}</p>}
          {submitWarning.email && <p className="mt-PcSm text-red-600">{submitWarning.email}</p>}
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">휴대폰번호</p>
          <input
            type="text"
            name="phone"
            value={input.phone}
            onChange={OnChange}
            className={
              `${
                warning.phone ? 'focus:ring-red-600 focus:border-red-600 ' : ' focus:ring-black focus:border-black '
              }` + 'w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none '
            }
            placeholder="휴대전화 번호를 입력하세요(-를빼고 입력해주세요)"
          ></input>
          {warning.phone && <p className="mt-PcSm text-red-500">{warning.phone}</p>}
          {submitWarning.phone && <p className="mt-PcSm text-red-600">{submitWarning.phone}</p>}
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">주소</p>
          <input
            type="text"
            name="addr"
            value={input.addr}
            onChange={OnChange}
            className="
              focus:ring-black focus:border-black 
              w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none "
            placeholder="주소를 입력하세요"
          ></input>
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">나이</p>
          <input
            type="text"
            name="age"
            value={input.age}
            onChange={OnChange}
            className="
              focus:ring-black focus:border-black 
              w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none "
            placeholder="나이를 입력하세요"
          ></input>
        </li>
        <li className="mt-PcMd">
          <p className="font-bold">성별</p>
          <GenderList genderList={genderList} OnChange={OnChange} />
        </li>
      </form>
      <button className="w-full h-20 mt-PcBase bg-black text-white" onClick={submit} type="submit" value={'서브밋'}>
        회원 가입 하기
      </button>
    </main>
  );
}

export default JoinFormBody;
