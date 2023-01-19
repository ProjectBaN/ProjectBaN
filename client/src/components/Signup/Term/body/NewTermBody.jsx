import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewTermCheckList from './NewTermCheckList';

function NewTermBody() {
  const [checkList, setCheckList] = useState([]);
  const [tcheck, setTcheck] = useState([]);
  const [allCheck, setAllCheck] = useState([]);

  const navigate = useNavigate();
  const termList = [
    {
      id: 1,
      name: 'termAge',
      value: 'termAge',
      title: '만 14세 이상입니다',
      required: true,
    },
    {
      id: 2,
      name: 'termUse',
      value: 'termUse',
      title: '개인정보 수집 및 이용 동의',
      required: true,
    },
    {
      id: 3,
      name: 'termInfo',
      value: 'termInfo',
      title: '개인정보 제3자 제공 동의',
      required: true,
    },
    {
      id: 4,
      name: 'termPrivateUse',
      value: 'termPrivateUse',
      title: '개인정보 유효기관 3년(미동의 시 1년) 제공 동의',
      required: true,
    },
    {
      id: 5,
      name: 'termEmailAd',
      value: 'termEmailAd',
      title: '이메일 수신 동의',
      required: false,
    },
    {
      id: 6,
      name: 'termAppPush',
      value: 'termAppPush',
      title: '앱 푸시 수신 동의',
      required: false,
    },
  ];
  const TermAllList = termList.map((term) => term.name);
  const TermRequiredList = termList.filter((term) => term.required).map((term) => term.name);
  const TermNameList = termList.filter((term) => term).map((term) => term.name);

  const termCheckList = TermNameList.filter((term) => checkList.includes(term));
  const termNotCheckList = TermNameList.filter((term) => !checkList.includes(term));

  //모든 체크표시
  const checkAll = (e) => {
    e.target.checked ? setCheckList(TermAllList) : setCheckList([]); //모두동의 체크를 하면 모두 체크되게한다. 다시 한번 더 체크하면 배열을 빈배열로 초기화 한다.
  };
  //개개인 체크표시
  const checkTerm = (e) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((choice) => choice !== e.target.name)); //클릭 해제 시 배열에서 제거한다
  };

  //버튼 클릭
  const onSubmit = (e) => {
    e.preventDefault();
    const requiredCheckList = TermRequiredList.filter((term) => !checkList.includes(term));
    let checkListItem = [];

    // const termTrueFalsecheckList = TermAllList.map((term) =>
    //   checkList.includes(term) ? (checkListItem = { [term]: 'T' }) : (checkListItem = { [term]: 'F' }),
    // );
    TermAllList.map((term) =>
      checkList.includes(term)
        ? (checkListItem = { ...checkListItem, [term]: 'T' })
        : (checkListItem = { ...checkListItem, [term]: 'F' }),
    );
    if (requiredCheckList.length !== 0) {
      alert(requiredCheckList + '체크를 하지 않으셨습니다.');
    } else {
      navigate('/signup/joinform', { state: { checkListItem } });
    }
  };
  return (
    <main className="max-w-signUpContainer m-auto mt-PcSm flex flex-col items-center">
      {/* title */}
      <p className="text-3xl font-bold text-center">약관 동의</p>

      {/* form */}
      <div className="w-full ">
        <form action="" className="px-2 " onSubmit={onSubmit}>
          <div className="h-20 flex items-center justify-start">
            <input
              type="checkbox"
              name="all"
              onChange={checkAll}
              checked={checkList.length === termList.length ? true : false}
              className="appearance-none bg-contain w-8 h-8 checked:bg-hero-pattern checked:bg-blue-600 checked:border-transparent border-2 border-solid border-black"
            />
            <p className="mx-PcSm">모두 동의</p>
          </div>
          {/* {console.log(TermNameList)}? 
          {console.log(termCheckList)} */}

          {termList.map((term) => (
            <NewTermCheckList term={term} key={term.id} checkTerm={checkTerm} checkList={checkList} />
          ))}
          <button className="w-full h-20 bg-black text-white" type="submit" value={'서브밋'}>
            동의하고 시작하기
          </button>
        </form>
      </div>
    </main>
  );
}

export default NewTermBody;
