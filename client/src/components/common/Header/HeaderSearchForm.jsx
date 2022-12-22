import React from 'react';
import { Link } from 'react-router-dom';
function HeaderSearchForm() {
  return (
    <div className="w-72">
      <input type="text" className="w-60 h-8 bg-gray-200 ml-4" placeholder="상품을 입력하세요" />
      <Link to="/">
        <i className="fa-solid fa-magnifying-glass fa-xl ml-2"></i>
      </Link>
    </div>
  );
}

export default HeaderSearchForm;
