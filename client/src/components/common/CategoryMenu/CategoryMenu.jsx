import React from 'react';
import HeaderDropDownMenu from '../Header/HeaderDropDownMenu';

function CategoryMenu() {
  return (
    <div className="w-28 dropDown relative flex items-center hover:bg-black hover:text-white">
      <i className="text-2xl fas fa-bars mr-MbSm"></i>
      <span className="text-xl font-bold">카테고리</span>
      <HeaderDropDownMenu />
    </div>
  );
}

export default CategoryMenu;
