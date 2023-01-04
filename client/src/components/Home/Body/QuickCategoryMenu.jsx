import React from 'react';
import { Link } from 'react-router-dom';

function QuickCategoryMenu() {
  return (
    <div className="flex justify-evenly gap-MbLarge px-MbSm mt-MbMedium md:flex md:justify-around lg:mt-PcBase lg:flex lg:justify-around ">
      <Link to="/" className="flex flex-col items-center text-sm  ">
        <i className="fa-solid fa-ranking-star flex justify-center rounded-full items-center w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-yellow-300 "></i>
        <span className="mt-MbSm lg:text-base">이벤트</span>
      </Link>
      <Link to="/" className="flex flex-col items-center text-sm">
        <i className="fa-solid fa-bomb flex justify-center  rounded-full items-center w-10 h-10 md:w-12 md:h-12  lg:w-16 lg:h-16 bg-blue-300 "></i>
        <span className="mt-MbSm lg:text-base">페디</span>
      </Link>
      <Link to="/" className="flex flex-col items-center text-sm">
        <i className="fa-solid fa-hand flex justify-center  rounded-full items-center w-10 h-10 md:w-12 md:h-12  lg:w-16 lg:h-16 bg-red-200"></i>
        <span className="mt-MbSm lg:text-base">네일</span>
      </Link>
      <Link to="/" className="flex flex-col items-center text-sm">
        <i className="fa-solid fa-syringe flex justify-center  rounded-full items-center w-10 h-10 md:w-12 md:h-12  lg:w-16 lg:h-16 bg-orange-300"></i>
        <span className="mt-MbSm lg:text-base">큐티클</span>
      </Link>
      <Link to="/" className="flex flex-col items-center text-sm">
        <i className="fa-solid fa-note-sticky flex justify-center  rounded-full items-center w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-red-400"></i>
        <span className="mt-MbSm lg:text-base">스티커</span>
      </Link>
    </div>
  );
}

export default QuickCategoryMenu;
