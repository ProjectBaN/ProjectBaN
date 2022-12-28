import React from 'react';

import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import HeaderMenu from './HeaderMenu';

function Header() {
  return (
    <div className=" mt-Mbmd flex flex-colmx-auto  md:bg-yellow-200 lg:bg-green-300 xl:bg-red-500 2xl:bg-violet-700">
      <div className="sm:flex gap-MbSm items-center">
        <HeaderHomeLogo />
        <HeaderSearchForm />
        <div className="sm:hudde"></div>
        <HeaderSideMenu />
      </div>
      <div className="sm:flex gap-MbSm items-center mt-MbSm ">
        <CategoryMenu />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
