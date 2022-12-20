import React from 'react';

import HomeFooter from '../components/Home/Footer/HomeFooter';
import HomeBody from '../components/Home/Body/HomeBody';
import HomeHeader from '../components/Home/Header/HomeHeader';
import HeaderEventBanner from '../components/common/Header/HeaderEventBanner';

function HomeMain() {
  return (
    <div>
      <HomeHeader />
      <HomeBody />
      <HomeFooter />
    </div>
  );
}

export default HomeMain;
