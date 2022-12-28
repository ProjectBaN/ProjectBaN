import React from 'react';
import EventBannerSlide from '../../common/EventBanner/EventBannerSlide';
import BestProductContainer from '../Container/BestProductContainer';

function HomeBody() {
  return (
    <div className="w-full mt-PCbase  ">
      {/* 컨테이너  배 경색 state setstate > 아래에 던지고 > next setstate > >*/}
      <div className="">
        <EventBannerSlide />
      </div>
      <div className="md:w-2/3 flex w-pcContainer ml-auto mr-auto">
        <BestProductContainer />
      </div>
    </div>
  );
}

export default HomeBody;
