import React from 'react';
import BestProductCard from '../../common/Body/BestProductCard';
import EventBannerSlide from '../../EventBanner/EventBannerSlide';

function HomeBody() {
  return (
    <div className="w-full mt-PCbase ">
      <EventBannerSlide />
      <div className="flex w-pcContainer ml-auto mr-auto">
        <BestProductCard />
      </div>
    </div>
  );
}

export default HomeBody;
