import React from 'react';

import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import HeaderCategoryMenu from './HeaderCategoryMenu';

function Header() {
  return (
    <div className="w-pcContainer m-auto bg-red-300">
      <div className="flex justify-center items-center ">
        <HeaderHomeLogo />
        <HeaderSearchForm />
        <HeaderSideMenu />
      </div>
      <HeaderCategoryMenu />
    </div>
  );
}

export default Header;
