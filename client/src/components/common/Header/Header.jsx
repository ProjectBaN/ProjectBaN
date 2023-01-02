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
      <div className="mt-MbMedium px-PcSm flex justify-between items-center">
        <CategoryModal />
        <HomeLogo />
        <HeaderButtonIcons />
      </div>
      <div className="w-full mt-MbMedium  px-PcSm">
        <HeaderSearchForm />
      </div>

      <div className="px-PcSm mt-MbMedium md:text-lg">
        <HeaderMenu />
      </div>

      <div className="hidden">
        <CategoryMenu />
      </div>

      <div className="hidden">
        <HeaderSideMenu />
      </div>
    </header>
  );
}

export default Header;
