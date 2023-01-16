import React from 'react';

function NewTermCheckList({ term, checkTerm, checkList, setCheckedList, checkedList }) {
  return (
    <li className="relative" key={term.id}>
      <div className="flex h-20 items-center">
        <input
          className="appearance-none bg-contain w-8 h-8 checked:bg-hero-pattern checked:bg-blue-600 checked:border-transparent border-2 border-solid border-black"
          type="checkbox"
          id=""
          name={term.name}
          onChange={checkTerm}
          checked={checkList.includes(term.name) ? true : false}
        />
        <p className="mx-PcSm font-bold text-sm">{term.title}</p>
      </div>
    </li>
  );
}

export default NewTermCheckList;
