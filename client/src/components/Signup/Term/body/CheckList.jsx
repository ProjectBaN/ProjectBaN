import React from 'react';

function CheckList({ term, termCheck, CheckList, warmList }) {
  return (
    <li className="relative" key={term.id}>
      <div className="flex h-20 items-center">
        <input
          className="appearance-none bg-contain w-8 h-8 checked:bg-hero-pattern checked:bg-blue-600 checked:border-transparent border-2 border-solid border-black"
          type="checkbox"
          id=""
          name=""
          checked={CheckList.includes(term.title)}
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
}

export default CheckList;
