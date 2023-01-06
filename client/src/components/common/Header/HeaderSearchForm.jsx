import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function HeaderSearchForm() {
  const [searchKeyword, setSearchkeyword] = useState('');

  const onChange = (e) => {
    setSearchkeyword(e.target.value);
  };
  return (
    <div className="flex items-center gap-MbSm w-full">
      <input
        type="text"
        className="flex flex-col w-full pl-MbSm  h-MbBase  bg-gray-200 "
        placeholder="상품을 입력하세요"
        onChange={onChange}
      />
      <Link to={`/search?searchKeyword=${searchKeyword}`}>
        <i className="fa-solid fa-magnifying-glass fa-xl "></i>
      </Link>
    </div>
  );
}

export default HeaderSearchForm;
