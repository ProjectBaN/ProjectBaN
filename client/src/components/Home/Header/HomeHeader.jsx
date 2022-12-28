import React from 'react';
import Header from '../../common/Header/Header';
import HeaderEventBanner from '../../common/Header/HeaderEventBanner';
function HomeHeader() {
  return (
    <div className="sm:w-full">
      <HeaderEventBanner />
      <Header />
    </div>
  );
}

export default HomeHeader;
