import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/Modal';
import AllTermListCheck from './AllTermListCheck';
import CheckList from './CheckList';

// 값 숨기기
const joinTermList = [
  {
    id: 1,
    title: '만 14세 이상입니다.',
    required: true,
    contents:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos dolorum natus dignissimos nemo qui modi delectus, quam omnis odio animi neque tempora, itaque ratione, quas reiciendis. Facere dolorem incidunt soluta ',
    value: '14year',
  },
  { id: 2, title: '이용약관동의', required: true, value: 'use' },
  { id: 3, title: '개인정도 수집 및 동의', required: true, value: 'info' },
  { id: 4, title: '선택정보 수집및 동의', required: false, value: 'choiceInfo' },
  { id: 5, title: '개인정보 유효기관 3년(미동의 시 1년)', required: false, value: '3year' },
  { id: 6, title: '이메일 마케팅동의', required: false, value: 'email' },
];

const joinTermRequiredList = joinTermList.filter((term) => term.required).map((term) => term.title);

const joinTermTitleList = joinTermList.map((term) => term.title);

function TermBody() {
  useEffect(() => {
    allTermCheckSwitch();
    return () => {};
  });
  const navigate = useNavigate();
  const [termCheckList, setTermCheckList] = useState([]);
  const [allTermListCheck, setAllTermListCheck] = useState(false);
  const [warmList, setWarmList] = useState([]);

  const [moDal, setMoDal] = useState(false);
  const [moDalContents, setMoDalContents] = useState({ title: '', contents: '' });

  const termCheck = (event) => {
    if (event.target.checked) {
      setTermCheckList([...termCheckList, event.target.value]);
      if (warmList.includes(event.target.value)) {
        setWarmList(warmList.filter((term) => term !== event.target.value));
      }
    } else {
      setTermCheckList(termCheckList.filter((term) => term !== event.target.value));
    }
  };

  const allTermCheck = (event) => {
    if (event.target.checked) {
      setTermCheckList(joinTermTitleList);
      setAllTermListCheck(true);
      setWarmList([]);
    } else {
      setAllTermListCheck(false);
      setTermCheckList([]);
    }
  };

  const allTermCheckSwitch = () => {
    if (termCheckList.length === joinTermList.length) {
      setAllTermListCheck(true);
    } else {
      setAllTermListCheck(false);
    }
  };

  const JoinSubmit = (event) => {
    event.preventDefault();
    const requiredCheckList = joinTermRequiredList.filter((term) => !termCheckList.includes(term));

    if (requiredCheckList.length !== 0) {
      alert(requiredCheckList + '를 체크하지 않으셨습니다.');
      setWarmList(requiredCheckList);
    } else {
      const termCheckIdList = joinTermList
        .filter((term) => termCheckList.includes(term.title))
        .map((term) => term.value);
      console.log(termCheckIdList);
      navigate('/signup/joinform', { state: termCheckIdList });
    }
  };

  const modalSet = (title, contents) => {
    setMoDalContents({ title, contents });
    setMoDal(true);
  };

  return (
    <main className="max-w-signUpContainer  m-auto mt-PcSm flex flex-col items-center">
      {/* title */}
      <p className="text-3xl font-bold text-center">약관 동의</p>

      {/* form */}
      <div className="w-full">
        <form action="" className="px-2" onSubmit={JoinSubmit}>
          <AllTermListCheck checked={allTermListCheck} onChange={allTermCheck} />

          {joinTermList.map((term) => {
            return (
              <CheckList
                key={term.id}
                term={term}
                CheckList={termCheckList}
                termCheck={termCheck}
                warmList={warmList}
                modalSet={modalSet}
              />
            );
          })}

          <button className="w-full h-20 bg-black text-white" type="submit" value={'서브밋'}>
            동의하고 시작하기
          </button>
        </form>
      </div>
      <Modal modal={moDal} setModal={setMoDal} title={moDalContents.title} contents={moDalContents.contents} />
    </main>
  );
}

export default TermBody;
