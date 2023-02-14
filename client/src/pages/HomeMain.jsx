import React, { useEffect } from 'react';

import HomeFooter from '../components/Home/Footer/HomeFooter';
import HomeBody from '../components/Home/Body/HomeBody';
import HomeHeader from '../components/Home/Header/HomeHeader';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/loading/Loading';
import axios from 'axios';
import { asycGetUser } from '../redux/reducer/loginSlice';

function HomeMain() {
  const user = useSelector((state) => state.user.isUser);
  const dispatch = useDispatch();
  const loginUser = () => {
    dispatch(asycGetUser());
  };
  useEffect(() => {
    loginUser();
  }, [loginUser]);
  return user ? (
    <div></div>
  ) : (
    <div className="">
      <HomeHeader />
      <HomeBody />
      <HomeFooter />
    </div>
  );
}

export default HomeMain;
