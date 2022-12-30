import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/Modal';

// 값 숨기기
const joinTermList = [
  {
    id: 1,
    title: '만 14세 이상입니다.',
    required: true,
    contents:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos dolorum natus dignissimos nemo qui modi delectus, quam omnis odio animi neque tempora, itaque ratione, quas reiciendis. Facere dolorem incidunt soluta ',
  },
  { id: 2, title: '이용약관동의', required: true },
  { id: 3, title: '개인정도 수집 및 동의', required: true },
  { id: 4, title: '선택정보 수집및 동의', required: false },
  { id: 5, title: '개인정보 유효기관 3년(미동의 시 1년)', required: false },
  { id: 6, title: '이메일 마케팅동의', required: false },
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
      const termCheckIdList = joinTermList.filter((term) => termCheckList.includes(term.title)).map((term) => term.id);
      navigate('/signup/joinform', { state: termCheckIdList });
    }
  };

  const modalSet = (title, contents) => {
    setMoDalContents({ title, contents });
    setMoDal(true);
  };

  return (
    <main className="max-w-signUpContainer m-auto mt-PCbase flex flex-col items-center">
      {/* title */}
      <p className="text-3xl font-bold text-center">약관 동의</p>

      {/* form */}
      <div className="w-full">
        <form action="" className="" onSubmit={JoinSubmit}>
          <div className="h-20 flex items-center justify-start">
            <input
              className="appearance-none bg-contain w-8 h-8 checked:bg-hero-pattern checked:bg-blue-600 checked:border-transparent border-2 border-solid border-black"
              type="checkbox"
              name=""
              id=""
              checked={allTermListCheck}
              onChange={allTermCheck}
            />
            <p className="mx-PcSm">모두 동의</p>
          </div>

          {joinTermList.map((term) => {
            return (
              <li className="relative" key={term.id}>
                <div className="flex h-20 items-center">
                  <input
                    className="appearance-none bg-contain w-8 h-8 checked:bg-hero-pattern checked:bg-blue-600 checked:border-transparent border-2 border-solid border-black"
                    type="checkbox"
                    id=""
                    name=""
                    checked={termCheckList.includes(term.title)}
                    value={term.title}
                    onChange={termCheck}
                  />

                  {term.required === true ? (
                    <p className="mx-PcSm font-bold text-sm">{term.title}</p>
                  ) : (
                    <p className="mx-PcSm text-sm">{term.title}</p>
                  )}

                  {term.required === true ? <p className="font-bold">(필수)</p> : <div>(선택)</div>}

                  {term.contents && (
                    <button
                      className="absolute right-0 font-bold"
                      onClick={(e) => {
                        e.preventDefault();
                        modalSet(term.title, term.contents);
                      }}
                    >
                      내용보기
                    </button>
                  )}
                </div>
                {warmList.includes(term.title) && <div className="text-red-500">필수 동의 입니다.</div>}
              </li>
            );
          })}

          <button className="w-full h-20   bg-black text-white" type="submit" value={'서브밋'}>
            동의하고 시작하기
          </button>
        </form>
      </div>
      <Modal modal={moDal} setModal={setMoDal} title={moDalContents.title} contents={moDalContents.contents} />
    </main>
  );
}

export default TermBody;
