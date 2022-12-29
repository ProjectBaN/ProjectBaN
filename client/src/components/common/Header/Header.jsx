import React from 'react';

import HeaderSearchForm from './HeaderSearchForm';
import HeaderSideMenu from './HeaderSideMenu';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import HeaderMenu from './HeaderMenu';
import HomeLogo from './HomeLogo';
import HeaderEventBanner from './HeaderEventBanner';
import HeaderButtonIcons from './HeaderButtonIcons';

function Header() {
  return (
    <header class=" w-full ">
      <HeaderEventBanner />
      <div class="flex items-center justify-center mt-MbBase">
        <div class="flex flex-row gap-MbMedium items-center md:flex flex-col ">
          <HomeLogo />
          <HeaderSearchForm />
          <div class="flex justify-between items-center hidden md:hidden lg:block xl:block">
            <HeaderSideMenu />
          </div>
          <div class="hidden md:block lg:hidden xl:hidden">
            <HeaderButtonIcons />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-MbSm gap-MbMedium md:flex-row items-center ">
        <HeaderMenu />
        <div className="md:block flex flex-row">
          <CategoryMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
