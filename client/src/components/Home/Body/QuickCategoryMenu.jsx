import React from 'react';
import { Link } from 'react-router-dom';

function QuickCategoryMenu() {
  return (
    <div className="flex justify-center gap-MbLarge px-MbSm mt-MbMedium">
      <li className="w-14 h-20 flex flex-col justify-center items-center text-sm ">
        <Link to="/" className="flex flex-col items-center text-sm  ">
          <i className="fa-solid fa-ranking-star flex justify-center rounded-full items-center w-10 h-10 bg-yellow-300 "></i>
          <span className="mt-MbSm">이벤트</span>
        </Link>
      </li>
      <li className="w-14 h-20 flex justify-center items-center ">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-bomb flex justify-center  rounded-full items-center w-10 h-10 bg-blue-300 "></i>
          <span className="mt-MbSm">페디</span>
        </Link>
      </li>
      <li className="w-14 h-20 flex justify-center items-center ">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-hand flex justify-center  rounded-full items-center w-10 h-10 bg-red-200"></i>
          <span className="mt-MbSm">네일</span>
        </Link>
      </li>
      <li className="w-14 h-20 flex justify-center items-center ">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-syringe flex justify-center  rounded-full items-center w-10 h-10 bg-orange-300"></i>
          <span className="mt-MbSm">큐티클</span>
        </Link>
      </li>
      <li className="w-14 h-20 flex justify-center items-center ">
        <Link to="/" className="flex flex-col items-center text-sm">
          <i className="fa-solid fa-note-sticky flex justify-center  rounded-full items-center w-10 h-10 bg-red-400"></i>
          <span className="mt-MbSm">스티커</span>
        </Link>
      </li>
    </div>
  );
}

export default QuickCategoryMenu;
