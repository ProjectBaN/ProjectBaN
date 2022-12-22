import React from 'react';

import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <div className="w-pcContainer ml-auto mr-auto mb-8  ">
      <div className="flex gap-10 items-end pt-8">
        <HeaderHomeLogo />
        <HeaderSearchForm />
        <HeaderSideMenu />
      </div>
      <div className="flex gap-5 items-center pt-8">
        <HeaderCategoryMenu />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
