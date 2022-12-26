import React from 'react';
import { Link } from 'react-router-dom';

function HeaderCategoryMenu() {
  return (
    <Link to="/category" className=" hover:bg-black hover:text-white">
      <i className="text-2xl fas fa-bars mr-PCsm "></i>
      <span className="text-xl font-bold">카테고리</span>
    </Link>
  );
}

export default HeaderCategoryMenu;
