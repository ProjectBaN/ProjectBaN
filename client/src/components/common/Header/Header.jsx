import React from 'react';

import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';

function Header() {
  return (
    <div className="w-pcContainer m-auto bg-red-300">
      <div className="flex justify-center items-center ">
        <HeaderHomeLogo />
        <HeaderSearchForm />
      </div>
      <div className="">
        <HeaderSideMenu />
      </div>
    </div>
  );
}

export default Header;
