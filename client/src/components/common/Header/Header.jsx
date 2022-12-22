import React from 'react';

import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <div className="w-pcContainer m-auto bg-red-300">
      <div className="flex justify-center items-center ">
        <HeaderHomeLogo />
        <HeaderSearchForm />
        <HeaderSideMenu />
      </div>
      <div className="w-[620px] pt-6 flex gap-2 justify-start items-center m-auto ">
        <HeaderCategoryMenu />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
