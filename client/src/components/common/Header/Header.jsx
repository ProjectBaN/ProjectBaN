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
    <header>
      <HeaderEventBanner />
      <div className=" md:flex md:justify-around md:mx-auto">
        <div className=" md:hidden absolute top-MbBase left-MbBase ">
          <CategoryModal />
        </div>
        <div className="mbContainer md:flex md:flex-row md:items-center">
          <HomeLogo />
          <HeaderSearchForm />
          <div className=" hidden md:block">
            <HeaderSideMenu />
          </div>
          <div className="hidden  md:hidden lg:hidden xl:hidden">
            <HeaderButtonIcons />
          </div>
        </div>
      </div>
      <div className="hidden md:w-mbContainer md:mx-auto md:flex md:gap-MbMedium md:items-center md:mt-MbMedium md:justify-start">
        <CategoryMenu />
        <HeaderMenu />
      </div>
    </header>
  );
}

export default Header;
