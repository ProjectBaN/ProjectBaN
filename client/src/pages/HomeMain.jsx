import React from 'react';

import HomeFooter from '../components/Home/Footer/HomeFooter';
import HomeBody from '../components/Home/Body/HomeBody';
import HomeHeader from '../components/Home/Header/HomeHeader';

function HomeMain() {
  return (
    <div className=" mx-auto">
      <HomeHeader />
      <HomeBody />
      <HomeFooter />
    </div>
  );
}

export default HomeMain;
