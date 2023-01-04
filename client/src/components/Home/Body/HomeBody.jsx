import React from 'react';
import EventBannerContainer from '../../common/EventBannerContainer/EventBannerContainer';
import BestProductContainer from '../Container/BestProductContainer';
import ProductTabMenu from './ProductTabMenu';
import QuickCategoryMenu from './QuickCategoryMenu';

function HomeBody() {
  return (
    <div className="lg:mt-PcBase ">
      <EventBannerContainer />
      <div className="lg:w-PcContainer mx-auto">
        <QuickCategoryMenu />
        <ProductTabMenu />
        <BestProductContainer />
      </div>
    </div>
  );
}

export default HomeBody;
