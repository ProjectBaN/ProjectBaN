import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMenu from '../Header/HeaderMenu';
import CategoryMenuNav from './CategoryMenuNav';

function MobileCategoryMenu({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className=" w-full h-full fixed top:0 bottom-0 left-0 right-0 bg-black/20">
      <div className="w-2/4 h-full bg-slate-50 ">
        <div className="flex flex-row justify-between gap-MbSm p-MbMedium text-xl">
          <h3 className=" font-bold font-subtitle text-xl ">카테고리</h3>
          <button onClick={closeModal} className="">
            <i className="fa-solid fa-x fa-sm"></i>
          </button>
        </div>
        <CategoryMenuNav />
      </div>
    </div>
  );
}

export default MobileCategoryMenu;
