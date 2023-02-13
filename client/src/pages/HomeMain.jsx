import React from 'react';

import HomeFooter from '../components/Home/Footer/HomeFooter';
import HomeBody from '../components/Home/Body/HomeBody';
import HomeHeader from '../components/Home/Header/HomeHeader';
import { useSelector } from 'react-redux';
import Loading from '../components/common/loading/Loading';

function HomeMain() {
  const loadings = useSelector((state) => state.user.loading);
  return loadings ? (
    <Loading />
  ) : (
    <div className="">
      <HomeHeader />
      <HomeBody />
      <HomeFooter />
    </div>
  );
}

export default HomeMain;
