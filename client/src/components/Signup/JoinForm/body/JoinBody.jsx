import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressSearch from './AddressSearch';
import GenderList from './GenderList';
import Loading from '../../../common/loading/Loading';
import { asyncRegisterUser } from '../../../../redux/reducer/registerSlice';

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
    age: '',
    fulladdress: '',
  });
  const [address, setAddress] = useState('');
  const [genderButton, setGenderButton] = useState('');
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
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
    age: '',
  });

  const [duplicationCheckMessage, setDuplicationCheckMessage] = useState({
    id: '',
    email: '',
  });

  const [submitDuplicateMessage, setSubmitDuplicateMessage] = useState({
    id: '',
    email: '',
  });
  const [duplicateResult, setDuplicateResult] = useState({ id: false, email: false });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  useEffect(() => {
    if (!location.state) {
      // 약관동의 값이 없을 경우 가입으로 넘어 오지못하도록 설정
      alert('약관동의를 체크하지 않으셨습니다.');
      navigate('/signup');
    }
    passwordCheck();

    validationTest('id', idRegex, '3자 이상의 숫자와 영문을 조합하여 입력하십시오');
    validationTest('password', passwordRegex, '4자 이상의 숫자와 영문을 조합하여 입력하십시오 ');

    validationTest('name', nameRegex, '성명은 한글 및 영어로 입력하십시오');
    validationTest('email', emailRegex, '정확한 이메일을 입력하십시오');
    validationTest('phone', phoneRegex, '정확한 번호를 입력하십시오.');
    validationTest('age', ageRegex, '숫자만 입력하십시오 ');

    return () => {};
  });

  const validationTest = (name, regex, message) => {
    // 가입정보 입력 시 유효성 체크 함수
    if (input[name].length > 0 && regex.test(input[name]) && validation[name].length !== 0) {
      setValidationTest({ ...validation, [name]: '' });
    }

    if (input[name].length > 0 && !regex.test(input[name]) && validation[name].length === 0) {
      setValidationTest({ ...validation, [name]: message });
    }
  };

  const idCheck = (e) => {
    const id = e.target.value;

    axios
      .get(`http://localhost:8000/auth/signup/idcheck?id=${id}`)
      .then((duplication) => {
        duplication.data.data.duplicate === false &&
          setDuplicationCheckMessage({ ...duplicationCheckMessage, id: '사용 가능 아이디입니다.' });
        setSubmitDuplicateMessage({ ...submitDuplicateMessage, id: '' });
      })
      .catch((err) => {
        setDuplicationCheckMessage({ ...duplicationCheckMessage, id: '중복된 아이디입니다.' });
        setDuplicateResult({ ...duplicateResult, id: true });
      });
  };

  const emailCheck = (e) => {
    const email = e.target.value;
    if (email.length > 0) {
      axios
        .get(`http://localhost:8000/auth/signup/emailcheck?email=${email}`)
        .then((duplication) => {
          duplication.data.data.duplicate === false &&
            setDuplicationCheckMessage({ ...duplicationCheckMessage, email: '사용 가능 이메일입니다.' });
          setSubmitDuplicateMessage({ ...submitDuplicateMessage, email: '' });
        })
        .catch((err) => {
          setDuplicationCheckMessage({ ...duplicationCheckMessage, email: '중복된 이메일입니다.' });
          setDuplicateResult({ ...duplicateResult, email: true });
        });
    }
  };

  const onToggleModal = (e) => {
    //주소api 모달
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const onChange = (e) => {
    e.preventDefault();
    //가입정보 입력 시 값 받아오기
    setSubmitMessage({ ...submitMessage, [e.target.name]: '' });
    setDuplicationCheckMessage({ ...duplicationCheckMessage, [e.target.name]: '' });
    setDuplicateResult({ ...duplicateResult, [e.target.name]: false });
    setSubmitDuplicateMessage({ ...submitDuplicateMessage, [e.target.name]: '' });
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const passwordCheck = () => {
    if (
      input.password !== input.passwordConfirm &&
      input.passwordConfirm.length > 0 &&
      validation.passwordConfirm.length === 0
    ) {
      setValidationTest({ ...validation, passwordConfirm: '비밀번호가 일치하지 않습니다.' });
    }

    if (
      input.password !== input.passwordConfirm &&
      validation.passwordConfirm.length === 0 &&
      !passwordRegex.test(input.passwordConfirm)
    ) {
      setValidationTest({ ...validation, passwordConfirm: '비밀번호가 같지않습니다.' });
    }
    if (
      input.password === input.passwordConfirm &&
      validation.passwordConfirm.length !== 0 &&
      passwordRegex.test(input.passwordConfirm)
    ) {
      setValidationTest({ ...validation, passwordConfirm: '' });
    }
  };

  //가입 버튼 클릭시 가입정보의 빈값 및 정규식 체크
  const submitValueCheck = (name, regex, message) => {
    if (!input[name] || !regex.test(input[name])) {
      return message;
    } else {
      return '';
    }
  };

  const registerSumbit = (e) => {
    e.preventDefault();

    const id = submitValueCheck('id', idRegex, '아이디를 다시 입력해주세요');
    const password = submitValueCheck('password', passwordRegex, '비밀번호를 다시 입력해주세요');
    const passwordConfirm = submitValueCheck(
      'passwordConfirm',
      passwordRegex,
      '비밀번호 확인을 위해 다시 입력해주세요',
    );
    const name = submitValueCheck('name', nameRegex, '이름을 다시 입력해주세요');
    const email = submitValueCheck('email', emailRegex, '이메일을 다시 입력해주세요');
    const phone = submitValueCheck('phone', phoneRegex, '휴대폰 번호를 다시 입력해주세요');
    const age = submitValueCheck('age', ageRegex, '나이를 다시 입력해주세요');
    setSubmitMessage({ ...submitMessage, id, password, passwordConfirm, name, email, phone, age });
    if (
      id ||
      password ||
      name ||
      email ||
      phone ||
      age ||
      passwordConfirm ||
      duplicateResult.id === true ||
      duplicateResult.email === true ||
      input.password !== input.passwordConfirm ||
      genderButton === '' ||
      address.addressName === undefined ||
      input.fulladdress === '' ||
      !passwordRegex.test(input.password)
    ) {
    } else {
      let body = {
        data: {
          id: input.id,
          password: input.password,
          name: input.name,
          email: input.email,
          phone: input.phone,
          addr: address.addressName + input.fulladdress,
          age: input.age,
          gender: genderButton,
          termAge: location.state.checkListItem.termAge,
          termUse: location.state.checkListItem.termUse,
          termInfo: location.state.checkListItem.termInfo,
          termEmailAd: location.state.checkListItem.termEmailAd,
          termPrivateUse: location.state.checkListItem.termPrivateUse,
          termAppPush: location.state.checkListItem.termAppPush,
        },
      };
      dispatch(asyncRegisterUser(body))
        .then((result) => {
          if (result.payload.success) {
            navigate('/signup/ok', { state: result.payload.success });
          }
        })
        .catch((err) => {
          navigate('/signup/fail', { state: location.state });
        });
    }
  };
  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <main className="joinFormContainer ">
      <h2 className="pl-MbSm font-bold text-3xl text-center">회원가입</h2>
      <form className="w-full px-2" action="">
        <li className="joinListCommon">
          <p className="font-bold">아이디</p>
          <input
            type="text"
            name="id"
            placeholder="아이디를 입력하세요"
            onBlur={idCheck}
            onChange={onChange}
            className={
              (validation.id && input.id.length > 0) || submitMessage.id || duplicateResult.id
                ? 'IdInputFail'
                : 'idInput '
            }
          ></input>
          <div className="w-full text-base text-red-500 mt-PcSm">
            {submitMessage.id === '' && validation.id && input.id.length > 0 && <p className="">{validation.id}</p>}
            {!idRegex.test(input.id) && submitMessage.id && <p>{submitMessage.id}</p>}
          </div>
          {idRegex.test(input.id) && (
            <span
              className={duplicateResult.id ? 'text-sm font-bold   text-red-500' : 'text-sm font-bold   text-black'}
            >
              {duplicationCheckMessage.id}
            </span>
          )}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">비밀번호</p>
          <div className="">
            <input
              type="password"
              name="password"
              className={
                (validation.password && input.password.length > 0) || submitMessage.password
                  ? 'joinInputFail'
                  : 'joinInput '
              }
              placeholder="비밀번호를 입력하세요"
              onChange={onChange}
            ></input>
            <div className="w-full  text-base text-red-500 mt-PcSm">
              {submitMessage.password === '' && validation.password && input.password.length > 0 && (
                <p>{validation.password}</p>
              )}
              {submitMessage.password && <p>{submitMessage.password}</p>}
            </div>
          </div>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">비밀번호 확인</p>
          <div className="">
            <input
              type="password"
              name="passwordConfirm"
              className={
                (input.password !== input.passwordConfirm && input.passwordConfirm.length > 0) ||
                submitMessage.passwordConfirm
                  ? 'joinInputFail'
                  : 'joinInput'
              }
              placeholder="비밀번호를 입력하세요"
              onChange={onChange}
            ></input>
            <div className="w-full text-base text-red-500 mt-PcSm ">
              {input.passwordConfirm.length > 0 && input.password !== input.passwordConfirm && (
                <p>{validation.passwordConfirm}</p>
              )}
              {submitMessage.password && <p>{submitMessage.passwordConfirm}</p>}
            </div>
          </div>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">성명</p>
          <input
            type="text"
            name="name"
            onChange={onChange}
            className={
              (validation.name && input.name.length > 0) || submitMessage.name ? 'joinInputFail' : 'joinInput '
            }
            placeholder="성함을 입력하세요"
          ></input>
          <div className="w-full  text-base text-red-500 mt-PcSm ">
            {submitMessage.name === '' && validation.name && input.name.length > 0 ? <p>{validation.name}</p> : ''}
            {submitMessage.name && <p>{submitMessage.name}</p>}
          </div>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">이메일</p>
          <input
            type="text"
            name="email"
            onChange={onChange}
            onBlur={emailCheck}
            className={
              (validation.email && input.email.length > 0) || submitMessage.email || duplicateResult.email
                ? 'IdInputFail'
                : 'idInput '
            }
            placeholder="이메일을 입력하세요(ex:aaaa@aaaa.aa)"
          ></input>

          <div className="w-full text-base text-red-500 mt-PcSm">
            {submitMessage.email === '' && validation.email && input.email.length > 0 ? <p>{validation.email}</p> : ''}
            {submitMessage.email && <p>{submitMessage.email}</p>}
          </div>
          {emailRegex.test(input.email) && (
            <span
              className={duplicateResult.email ? 'text-sm font-bold   text-red-500' : 'text-sm font-bold   text-black'}
            >
              {duplicationCheckMessage.email}
            </span>
          )}
          {duplicationCheckMessage.email ? '' : <span className="text-red-500"> {submitDuplicateMessage.email}</span>}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">휴대폰번호</p>
          <input
            type="text"
            name="phone"
            onChange={onChange}
            className={
              (validation.phone && input.phone.length > 0) || submitMessage.phone ? 'joinInputFail' : 'joinInput '
            }
            placeholder="휴대전화 번호를 입력하세요"
          ></input>
          <div className="w-full  text-base text-red-500 mt-PcSm">
            {submitMessage.phone === '' && validation.phone && input.phone.length > 0 ? <p>{validation.phone}</p> : ''}
            {submitMessage.phone && <p>{submitMessage.phone}</p>}
          </div>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">주소</p>
          <div className="flex flex-row  justify-between items-center w-full h-11 mt-PcSm text-sm border  rounded-sm text-gray-500 border-gray-300 focus:outline-none ">
            <input
              type="text"
              name="addr"
              onChange={onChange}
              className=" w-full h-11 border-2 border-gray-300 bg-[#f1f1f1] p-2.5"
              placeholder="주소를 입력하세요"
              disabled={true}
              value={address.addressName || ''}
            ></input>
            <button onClick={onToggleModal} className="w-24 h-11 ml-2 bg-black text-white">
              <span>주소찾기</span>
            </button>
          </div>

          {isOpen && <AddressSearch setIsOpen={setIsOpen} setAddress={setAddress} address={address} />}
        </li>
        <li className="joinListCommon">
          <p className="font-bold">상세주소</p>
          <input
            type="text"
            name="fulladdress"
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
            onChange={onChange}
            className={(validation.age && input.age.length > 0) || submitMessage.age ? 'joinInputFail' : 'joinInput '}
            placeholder="나이를 입력하세요"
            maxLength={2}
          ></input>
          <div className="w-full text-base text-red-500 mt-PcSm">
            {submitMessage.age === '' && validation.age && input.age.length > 0 && <p> {validation.age}</p>}
            {submitMessage.age && <p>{submitMessage.age}</p>}
          </div>
        </li>
        <li className="joinListCommon">
          <p className="font-bold">성별</p>
          <GenderList genderList={genderList} genderButton={genderButton} setGenderButton={setGenderButton} />
        </li>
      </form>
      <button className="w-full h-20 mt-PcBase bg-black text-white" onClick={registerSumbit} type="submit">
        회원 가입 하기
      </button>
    </main>
  );
}

export default JoinBody;
