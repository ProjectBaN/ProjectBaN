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
      <div className="mt-MbMedium px-MbSm flex justify-between items-center lg:hidden ">
        <CategoryModal />
        <HomeLogo />
        <HeaderButtonIcons />
      </div>
      <div className="lg:w-PcContainer lg:mx-auto lg:mt-PcBase">
        <div className="lg:block lg-w-full  lg:flex lg:justify-center lg:items-center  lg:gap-PcMd ">
          <div className="hidden lg:block">
            <HomeLogo />
          </div>
          <div className="block lg:w-PcSearchForm px-MbSm ">
            <HeaderSearchForm />
          </div>
          <div className="hidden w-72 lg:block">
            <HeaderSideMenu />
          </div>
        </div>
      </div>

      <div className="px-MbSm mt-MbMedium lg:w-PcContainer lg:mt-PcSm lg:mx-auto">
        <div className=" lg:w-full flex lg:items-baseline gap-PcMd">
          <div className="hidden lg:block">
            <CategoryMenu />
          </div>
          <div className="hidden md:block">
            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
