import React from 'react';
import { Link } from 'react-router-dom';
function HeaderSearchForm() {
  return (
    <div className="xs:mt-MbSm  flex items-center gap-MbSm ">
      <input
        type="text"
        className="flex flex-col pl-MbSm w-MbSearchForm h-MbBase  bg-gray-200 "
        placeholder="상품을 입력하세요"
      />
      <Link to="/">
        <i className="fa-solid fa-magnifying-glass fa-xl "></i>
      </Link>
    </div>
  );
}

export default HeaderSearchForm;
