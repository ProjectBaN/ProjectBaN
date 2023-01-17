import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { register } from '../../../../redux/reducer/registerSlice';
import AddressSearch from './AddressSearch';
import GenderList from './GenderList';

const idRegex = /^[0-9a-zA-Z]{3,16}$/;
const nameRegex = /^[가-힣a-zA-Z]{2,10}$/;
const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const phoneRegex = /^01[0179][0-9]{7,8}$/;
const passwordRegex = /^[0-9a-zA-Z]{4,10}$/;
const ageRegex = /^[0-9]{0,2}$/;
let body = '';

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

  const [genderButton, setGenderButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!location.state) {
      alert('비정상적인 접근입니다.');
      navigate('/signup');
    }
    regexCheck('id', idRegex, '아이디는 3~16자리 영문과 숫자를 조합하여 적어주십시오');
    passwordConfirmCheck();
    regexCheck('name', nameRegex, '성함은 영문또는 한글로 작성해주세요');
    regexCheck('email', emailRegex, '올바른 이메일 형식을 적어주세요');
    regexCheck('phone', phoneRegex, '올바른 번호를 적어주세요');
    regexCheck('password', passwordRegex, '비밀번호는 4~10자리 영문과 숫자를 조합하여 적어주십시오');
    regexCheck('age', ageRegex, '숫자로만 적어주십시오');
    return () => {};
  });

  const onToggleModal = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const OnChange = (e) => {
    e.preventDefault();

    setInput({ ...input, [e.target.name]: e.target.value });

    setSubmitWarning({ ...submitWarning, [e.target.name]: '' });

    setGenderButton(e.target.value);
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
      return '입력해주세요';
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
    const password = submitCheck('password', passwordRegex);
    const age = submitCheck('age', ageRegex);
    setSubmitWarning({ ...submitWarning, email, id, name, phone, password, age });
    if (id || email || name || phone || password || age) {
      return;
    } else {
      const registerState = { input, term: location.state };
      dispatch(register(registerState));
    }
    body = {
      data: {
        id: input?.id,
        password: input.password,
        name: input?.name,
        email: input?.email,
        phone: input?.phone,
        addr: input?.addr,
        age: input?.age,
        gender: input?.gender,
        termAge: location.state.checkListItem.termAge,
        termUse: location.state.checkListItem.termUse,
        termInfo: location.state.checkListItem.termInfo,
        termEmailAd: location.state.checkListItem.termEmailAd,
        termPrivateUse: location.state.checkListItem.termPrivateUse,
        termAppPush: location.state.checkListItem.termAppPush,
      },
    };
    // const names = axios
    //   .post('http://localhost:8000/auth/signup', body, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //   })
    //   .catch((err) => console.log(err));
    console.log(body);
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
          <div
            className={
              `${
                warning.password
                  ? 'focus-within:ring-red-600 focus-within:border-red-600 '
                  : 'focus-within:ring-black focus-within:border-black '
              }` +
              'relative w-full h-11 flex items-center mt-PcSm border-solid border-2  rounded-sm  border-gray-300 focus-within:ring-black focus-within:border-black  focus-within:outline-none'
            }
          >
            <input
              type="password"
              name="password"
              className={
                `${
                  warning.password
                    ? 'focus:ring-red-600 focus:border-red-600 '
                    : ' focus:ring-black focus:border-black '
                }` + 'relative w-full p-2.5 text-sm focus:border-none focus:outline-none'
              }
              placeholder="비밀번호를 입력하세요"
              value={input.password}
              onChange={OnChange}
            ></input>
          </div>
          {warning.password && <p className="mt-PcSm text-red-600">{warning.password}</p>}
          {submitWarning.password && <p className="mt-PcSm text-red-600">{submitWarning.password}</p>}
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
              type="password"
              name="passwordConfirm"
              className="relative w-full p-2.5 text-sm focus:border-none focus:outline-none"
              placeholder="비밀번호를 입력하세요"
              value={input.passwordConfirm}
              onChange={OnChange}
            ></input>
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
              w-3/4 mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none "
            placeholder="주소를 입력하세요"
          ></input>
          <button onClick={onToggleModal} className="w-24 p-3.5 ml-4 bg-black text-white">
            주소찾기
          </button>
          {isOpen && <AddressSearch setIsOpen={setIsOpen} />}
        </li>

        <li className="mt-PcMd">
          <p className="font-bold">나이</p>
          <input
            type="text"
            name="age"
            value={input.age}
            onChange={OnChange}
            className={
              `${
                warning.phone ? 'focus:ring-red-600 focus:border-red-600 ' : ' focus:ring-black focus:border-black '
              }` + 'w-full mt-PcSm text-sm border-2 p-2.5 rounded-sm border-gray-300  focus:outline-none'
            }
            placeholder="나이를 입력하세요"
          ></input>
          {warning.age && <p className="mt-PcSm text-red-500">{warning.age}</p>}
          {submitWarning.age && <p className="mt-PcSm text-red-600">{submitWarning.age}</p>}
        </li>
        <li className="mt-PcMd">
          <p className="font-bold">성별</p>
          <GenderList genderList={genderList} OnChange={OnChange} genderButton={genderButton} />
        </li>
      </form>
      <button className="w-full h-20 mt-PcBase bg-black text-white" onClick={submit} type="submit" value={'서브밋'}>
        회원 가입 하기
      </button>
    </main>
  );
}

export default JoinFormBody;
