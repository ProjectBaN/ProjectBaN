import React from 'react';
import { Link } from 'react-router-dom';

function QuickCategoryMenu() {
  return (
    <div className="flex justify-center gap-MbLarge p-MbSm">
      <li className="w-14 h-14 flex justify-center items-center text-sm">
        <Link to="/" className="flex flex-col items-center">
          <i className="fa-solid fa-ranking-star"></i>
          이벤트
        </Link>
      </li>
      <li className="w-14 h-14 flex justify-center items-center">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-bomb"></i>기획전
        </Link>
      </li>
      <li className="w-14 h-14 flex justify-center items-center">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-hand"></i>
          네일
        </Link>
      </li>
      <li className="w-14 h-14 flex justify-center items-center">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-syringe"></i>
          큐티클
        </Link>
      </li>
      <li className="w-14 h-14 flex justify-center items-center">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-note-sticky"></i>
          스티커
        </Link>
      </li>
    </div>
  );
}

export default QuickCategoryMenu;
