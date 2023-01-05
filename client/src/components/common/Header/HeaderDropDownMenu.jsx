import React from 'react';
import { Link } from 'react-router-dom';

function HeaderDropDownMenu() {
  return (
    <ul className="dropDownMenu w-full hidden absolute font-bold text-white bg-black top-8">
      <Link to="" className="pl-2 h-12 flex items-center hover:bg-white hover:text-black text-lg">
        베스트 상품
      </Link>
      <Link to="" className="pl-2 h-12 flex items-center hover:bg-white hover:text-black">
        이벤트 기획전
      </Link>
      <Link to="" className="pl-2 h-12 flex items-center hover:bg-white hover:text-black">
        베스트 상품
      </Link>
    </ul>
  );
}

export default HeaderDropDownMenu;
