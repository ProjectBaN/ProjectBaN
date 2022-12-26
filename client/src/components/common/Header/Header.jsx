import React from 'react';

import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <div className="flex flex-col  gap-PCmd w-pcContainer mx-auto mt-PCbase  ">
      <div className="flex gap-PCmd items-end">
        <HeaderHomeLogo />
        <HeaderSearchForm />
        <HeaderSideMenu />
      </div>
      <div className="flex gap-PCsm items-baseline">
        <HeaderCategoryMenu />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
