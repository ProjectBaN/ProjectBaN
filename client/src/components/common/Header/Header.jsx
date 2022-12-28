import React from 'react';

import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <div className="flex flex-col gap-PCmd w-pcContainer mx-auto mt-PCbase bg-emerald-600 sm:bg-slate-700 md:bg-yellow-200 lg:bg-green-300 xl:bg-red-500 2xl:bg-violet-700">
      <div className="flex gap-PCmd items-center">
        <HeaderHomeLogo />
        <HeaderSearchForm />
        <HeaderSideMenu />
      </div>
      <div className="flex gap-PCsm items-center ">
        <CategoryMenu />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
