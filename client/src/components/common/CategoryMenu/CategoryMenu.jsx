import React from 'react';
import { Link } from 'react-router-dom';
import HeaderDropDownMenu from '../Header/HeaderDropDownMenu';

function CategoryMenu() {
  return (
    <div className="dropdown dropDown relative flex justify-center items-center hover:bg-black hover:text-white">
      <i className="text-2xl fas fa-bars mr-PCsm"></i>
      <span className="text-xl font-bold">카테고리</span>

      <HeaderDropDownMenu />
    </div>
  );
}

export default CategoryMenu;
