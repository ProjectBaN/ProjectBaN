import React from 'react';
import { Link } from 'react-router-dom';
import HeaderDropDownMenu from './HeaderDropDownMenu';

function HeaderCategoryMenu() {
  return (
    <div className="dropdown dropDown relative w-32 flex justify-center hover:bg-black hover:text-white">
      <i className="text-2xl fas fa-bars mr-PCsm  "></i>
      <span className="text-xl font-bold">카테고리</span>

      <HeaderDropDownMenu />
    </div>
  );
}

export default HeaderCategoryMenu;
