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
    <header className=" w-full ">
      <HeaderEventBanner />
      <div className="mt-MbMedium ml-MbMedium ">
        <CategoryModal />
      </div>
      <div className="xsContainer smContainer ">
        <HomeLogo />
        <HeaderSearchForm />
        <div className=" hidden md:hidden lg:block xl:block">
          <HeaderSideMenu />
        </div>
        <div className="hidden sm:block md:block lg:hidden xl:hidden">
          <HeaderButtonIcons />
        </div>
      </div>
      <div className="xs:flex xs:flex-row xs:justify-center xs:items-center xs:gap-MbMedium xs:mt-MbSm">
        <div className="xs:hidden flex flex-row ">
          <CategoryMenu />
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
