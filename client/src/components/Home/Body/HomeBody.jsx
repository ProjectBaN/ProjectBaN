import React from 'react';
import EventBannerSlide from '../../common/EventBanner/EventBannerSlide';
import BestProductContainer from '../Container/BestProductContainer';

function HomeBody() {
  return (
    <div className=" ">
      {/* 컨테이너  배 경색 state setstate > 아래에 던지고 > next setstate > >*/}
      <div className="">
        <EventBannerSlide />
      </div>
      <div className="">
        <BestProductContainer />
      </div>
    </div>
  );
}

export default HomeBody;
