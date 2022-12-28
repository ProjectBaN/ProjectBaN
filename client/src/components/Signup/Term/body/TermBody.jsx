import React, { useState } from 'react';

const joinTermList = [
  '만 14세 이상입니다.',
  '이용약관동의',
  '개인정도 수집 및 동의',
  '선택정보 수집및 동의',
  '개인정보 유효기관 3년(미동의 시 1년)',
  '이메일 마케팅동의',
];

const requireJoinTermList = ['만 14세 이상입니다.', '이용약관동의', '개인정도 수집 및 동의'];

function TermBody() {
  const [termList, setTermList] = useState([]);

  const [allTermListCheck, setAllTermListCheck] = useState(false);

  const JoinSubmit = (event) => {
    event.preventDefault();
    // 현재리스트에서 필수 체크리스트만 뽑음
    const requireCheckList = requireJoinTermList.filter((term) => termList.includes(term));
    //  위리스트를 돌려 필수 체크리스트 중 없는것을 리스트로 뽑음
    const nullCheckList = requireJoinTermList.filter((term) => !requireCheckList.includes(term));

    if (nullCheckList.length !== 0) {
      alert(nullCheckList + '를 입력해주세요');
    } else {
      alert('성공입니다.');
    }
  };

  const termCheck = (event) => {
    if (event.target.checked) {
      console.log(event.target.value + '체크되었습니다.');
      setTermList([...termList, event.target.value]);
    } else {
      console.log(event.target.value + '체크해제되었습니다.');
      setTermList(termList.filter((term) => term !== event.target.value));
    }
    console.log(event.target.checked);
  };

  const allTermCheck = (event) => {
    if (event.target.checked) {
      console.log('모두체크되었습니다.');
      setAllTermListCheck(true);
      setTermList([...joinTermList]);
    } else {
      console.log('모두체크해제되었습니다.');
      setAllTermListCheck(false);
      setTermList([]);
    }
    console.log(event.target.checked);
  };

  return (
    <main className="max-w-signUpContainer m-auto mt-PCbase flex flex-col items-center">
      {/* title */}
      <p className="text-3xl font-bold text-center">약관 동의</p>

      {/* form */}
      <div>
        <form action="" className="" onSubmit={JoinSubmit}>
          <li>
            <input
              type="checkbox"
              name=""
              id=""
              checked={allTermListCheck}
              value={'모두동의'}
              onChange={allTermCheck}
            />
            <label>모두 동의</label>
          </li>

          <li>
            <input
              type="checkbox"
              name=""
              id=""
              checked={termList.includes('만 14세 이상입니다.')}
              value={'만 14세 이상입니다.'}
              onChange={termCheck}
            ></input>
            <label>만 14세 이상입니다.</label>
          </li>

          <li>
            <input
              type="checkbox"
              name=""
              id=""
              checked={termList.includes('이용약관동의')}
              value={'이용약관동의'}
              onChange={termCheck}
            ></input>
            <label>이용약관 동의</label>
          </li>

          <li>
            <input
              type="checkbox"
              name=""
              id=""
              checked={termList.includes('개인정도 수집 및 동의')}
              value={'개인정도 수집 및 동의'}
              onChange={termCheck}
            ></input>
            <label>개인정도 수집 및 동의</label>
          </li>

          <li>
            <input
              type="checkbox"
              name=""
              id=""
              checked={termList.includes('선택정보 수집및 동의')}
              value={'선택정보 수집및 동의'}
              onChange={termCheck}
            ></input>
            <label>'선택정보 수집및 동의'</label>
          </li>

          <li>
            <input
              type="checkbox"
              name=""
              id=""
              checked={termList.includes('이메일 마케팅동의')}
              value={'이메일 마케팅동의'}
              onChange={termCheck}
            ></input>
            <label>이메일 마케팅동의</label>
          </li>

          <li>
            <input
              type="checkbox"
              name=""
              id=""
              checked={termList.includes('개인정보 유효기관 3년(미동의 시 1년)')}
              value={'개인정보 유효기관 3년(미동의 시 1년)'}
              onChange={termCheck}
            ></input>
            <label>개인정보 유효기관 3년(미동의 시 1년)</label>
          </li>

          <input type="submit" value={'서브밋'} />
        </form>
      </div>
    </main>
  );
}

export default TermBody;
