import React from 'react';
import { Link } from 'react-router-dom';
function HeaderSearchForm() {
  return (
    <div className="flex gap-2 items-center ">
      <input type="text" className="w-pcSearchForm h-10 bg-gray-200 " placeholder="상품을 입력하세요" />
      <Link to="/" className="">
        <i className="fa-solid fa-magnifying-glass fa-xl "></i>
      </Link>
    </div>
  );
}

export default HeaderSearchForm;
