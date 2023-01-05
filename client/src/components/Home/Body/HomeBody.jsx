import React from 'react';
import EventBannerSlide from '../../common/EventBanner/EventBannerSlide';
import BestProductContainer from '../Container/BestProductContainer';
import ProductTabMenu from './ProductTabMenu';
import QuickCategoryMenu from './QuickCategoryMenu';

function HomeBody() {
  return (
    <div className="py-MbSm ">
      <EventBannerSlide />
      <QuickCategoryMenu />
      <ProductTabMenu />
      <BestProductContainer />
    </div>
  );
}

export default HomeBody;
