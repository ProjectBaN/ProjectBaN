import React from 'react';

import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import HeaderMenu from './HeaderMenu';
import HomeLogo from './HomeLogo';
import HeaderEventBanner from './HeaderEventBanner';
import HeaderButtonIcons from './HeaderButtonIcons';
import CategoryModal from '../CategoryMenu/CategoryModal';

function Header() {
  return (
    <header className="w-full ">
      <HeaderEventBanner />
      <div className="p-3 md:hidden ">
        <CategoryModal />
      </div>
      <div className="flex flex-col justify-center items-center gap-MbMedium mt-MbMedium md:flex md:flex-row">
        <HomeLogo />
        <HeaderSearchForm />
        <div className=" hidden md:block lg:block xl:block">
          <HeaderSideMenu />
        </div>
        <div className="hidden  md:hidden lg:hidden xl:hidden">
          <HeaderButtonIcons />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-MbMedium mt-MbSm">
        <div className="hidden flex flex-row items-center gap-MbMedium ">
          <CategoryMenu />
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
