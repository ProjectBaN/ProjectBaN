import React from 'react';
import BestProductCard from './BestProductCard';
import EventBannerSlide from '../../common/EventBanner/EventBannerSlide';
import BestProductContainer from '../Container/BestProductContainer';

function HomeBody() {
  return (
    <div className="w-full mt-PCbase ">
      <EventBannerSlide />
      <div className="flex w-pcContainer ml-auto mr-auto">
        <BestProductContainer />
      </div>
    </div>
  );
}

export default HomeBody;
