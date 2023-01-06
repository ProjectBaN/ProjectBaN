import React from 'react';
import EventBannerContainer from '../../common/EventBannerContainer/EventBannerContainer';
import BestProductContainer from '../Container/BestProductContainer';
import QuickCategoryMenu from './QuickCategoryMenu';
import RecommendProductContainer from './RecommendProductContainer';

function HomeBody() {
  return (
    <div className="mt-MbSm lg:mt-PcSm ">
      <EventBannerContainer />
      <div className="lg:w-PcContainer mx-auto">
        <QuickCategoryMenu />
        <RecommendProductContainer />
        <BestProductContainer />
      </div>
    </div>
  );
}

export default HomeBody;
