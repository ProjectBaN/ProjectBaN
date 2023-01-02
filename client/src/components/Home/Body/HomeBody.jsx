import React from 'react';
import EventBannerSlide from '../../common/EventBanner/EventBannerSlide';
import BestProductContainer from '../Container/BestProductContainer';

function HomeBody() {
  return (
    <div className="py-MbSm">
      <EventBannerSlide />
      <BestProductContainer />
    </div>
  );
}

export default HomeBody;
