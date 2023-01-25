import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressSearch from './AddressSearch';
import GenderList from './GenderList';

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

const idRegex = /^[0-9a-zA-Z]{3,16}$/;
const nameRegex = /^[가-힣a-zA-Z]{2,10}$/;
const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const phoneRegex = /^01[0179][0-9]{7,8}$/;
const passwordRegex = /^[0-9a-zA-Z]{4,10}$/;
const ageRegex = /^[0-9]{0,2}$/;

function JoinBody() {
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
  const [address, setAddress] = useState('');
  const [genderButton, setGenderButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [validation, setValidationTest] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
    age: '',
  });
  const [submitMessage, setSubmitMessage] = useState({
    message,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      // 약관동의 값이 없을 경우 가입으로 넘어 오지못하도록 설정
      alert('약관동의를 체크하지 않으셨습니다.');
      navigate('/signup');
    }

    passwordCheck();

    validationTest('id', idRegex, '3 ~ 16자리의 숫자와 영문을 조합하여 입력하십시오');
    validationTest('password', passwordRegex, '4 ~ 10자리의 숫자와 영문을 조합하여 입력하십시오 ');
    validationTest('name', nameRegex, '성명은 한글 및 영어로 입력하십시오');
    validationTest('email', emailRegex, '정확한 이메일을 입력하십시오');
    validationTest('phone', phoneRegex, '정확한 번호를 입력하십시오.');
    validationTest('age', ageRegex, '숫자만 입력하십시오 ');

    return () => {};
  });

  const validationTest = (name, regex, message) => {
    console.log('실행됨 D_check');

    // 가입정보 입력 시 유효성 체크 함수
    if (input[name].length > 0 && regex.test(input[name]) && validation[name].length !== 0) {
      setValidationTest({ ...validation, [name]: '' });
    }

    if (input[name].length > 0 && !regex.test(input[name]) && validation[name].length === 0) {
      setValidationTest({ ...validation, [name]: message });
    }
  };
  const onToggleModal = (e) => {
    //주소api 모달
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const passwordCheck = () => {
    console.log('실행됨 pwCheck');
    if (input.password !== input.passwordConfirm && validation.passwordConfirm.length === 0) {
      setValidationTest({ ...validation, passwordConfirm: '비밀번호가 같지않습니다.' });
    }
    if (input.password === input.passwordConfirm && validation.passwordConfirm.length !== 0) {
      setValidationTest({ ...validation, passwordConfirm: '' });
    }
  };
  const onChange = (e) => {
    //가입정보 입력 시 값 받아오기
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setGenderButton(e.target.value);
  };

  const registerSumbit = (e) => {
    e.preventDefault();

    // const id = !idRegex.test(input.id) ? '다시입력해주세요' : input.id;

    // const id = !idRegex.test(input.id) ? '다시입력해주세요' : input.id;

    // const id = !idRegex.test(input.id) ? '다시입력해주세요' : input.id;

    // const id = !idRegex.test(input.id) ? '다시입력해주세요' : input.id;

    // const id = !idRegex.test(input.id) ? '다시입력해주세요' : input.id;

    alert(id);
  };

  return (
    <main className="max-w-signUpContainer m-auto mt-MbBase flex flex-col items-center">
      <form className="w-full px-2" action="">
        <li className="mt-MbSm">
          <p className="font-bold">아이디</p>
          <input
            type="text"
            name="id"
            placeholder="아이디를 입력하세요"
            value={input.id}
            onChange={onChange}
            className={validation.id && input.id.length > 0 ? 'joinInputFail' : 'joinInput '}
          ></input>
          {validation.id && input.id.length > 0 ? <p className="mt-PcSm text-red-500">{validation.id}</p> : ''}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">비밀번호</p>
          <div className=" ">
            <input
              type="password"
              name="password"
              className={validation.password && input.password > 0 ? 'joinInputFail' : 'joinInput '}
              placeholder="비밀번호를 입력하세요"
              value={input.password}
              onChange={onChange}
            ></input>
            {validation.password && input.password.length > 0 ? (
              <p className="mt-PcSm text-red-500">{validation.password}</p>
            ) : (
              ''
            )}
          </div>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">비밀번호 확인</p>
          <div className="">
            <input
              type="password"
              name="passwordConfirm"
              className={validation.passwordConfirm && input.passwordConfirm.length > 0 ? 'joinInputFail' : 'joinInput'}
              placeholder="비밀번호를 입력하세요"
              value={input.passwordConfirm}
              onChange={onChange}
            ></input>
            {validation.passwordConfirm && input.passwordConfirm.length > 0 ? (
              <p className="mt-PcSm text-red-500">{validation.passwordConfirm}</p>
            ) : (
              ''
            )}
          </div>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">성명</p>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={onChange}
            className={validation.name && input.name.length > 0 ? 'joinInputFail' : 'joinInput '}
            placeholder="성함을 입력하세요"
          ></input>
          {validation.name && input.name.length > 0 ? <p className="mt-PcSm text-red-500">{validation.name}</p> : ''}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">이메일</p>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={onChange}
            className={validation.email && input.email.length > 0 ? 'joinInputFail' : 'joinInput '}
            placeholder="이메일을 입력하세요(ex:aaaa@aaaa.aa)"
          ></input>
          {validation.email && input.email.length > 0 ? <p className="mt-PcSm text-red-500">{validation.email}</p> : ''}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">휴대폰번호</p>
          <input
            type="text"
            name="phone"
            value={input.phone}
            onChange={onChange}
            className={validation.phone && input.phone.length > 0 ? 'joinInputFail' : 'joinInput '}
            placeholder="휴대전화 번호를 입력하세요(-를빼고 입력해주세요)"
          ></input>
          {validation.phone && input.phone.length > 0 ? <p className="mt-PcSm text-red-500">{validation.phone}</p> : ''}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">주소</p>
          <input
            type="text"
            name="addr"
            value={address.addressName || ''}
            onChange={onChange}
            className="
            addressInput"
            placeholder="주소를 입력하세요"
          ></input>

          <button onClick={onToggleModal} className="w-24 p-3.5 ml-4 bg-black text-white">
            주소찾기
          </button>
          {isOpen && <AddressSearch setIsOpen={setIsOpen} setAddress={setAddress} address={address} />}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">상세주소</p>
          <input
            type="text"
            name="fulladdress"
            value={input.fulladdress}
            onChange={onChange}
            className="
            joinInput"
            placeholder="주소를 입력하세요"
          ></input>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">나이</p>
          <input
            type="text"
            name="age"
            value={input.age}
            onChange={onChange}
            className={validation.age ? 'joinInputFail' : 'joinInput '}
            placeholder="나이를 입력하세요"
          ></input>
          {validation.age && <p className="mt-PcSm text-red-500">{validation.age}</p>}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">성별</p>
          <GenderList genderList={genderList} onChange={onChange} genderButton={genderButton} />
        </li>
      </form>
      <button
        className="w-full h-20 mt-PcBase bg-black text-white"
        onClick={registerSumbit}
        type="submit"
        value={'서브밋'}
      >
        회원 가입 하기
      </button>
    </main>
  );
}

export default JoinBody;
