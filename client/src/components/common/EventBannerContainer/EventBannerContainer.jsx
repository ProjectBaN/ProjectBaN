import React from 'react';
import EventBannerSlide from '../EventBanner/EventBannerSlide';

function EventBannerContainer() {
  const eventBannerSlideList = [
    {
      imgUrl: '/images/EventBannerSlide1.jpg',
    },
    {
      imgUrl: '/images/EventBannerSlide2.jpg',
    },
    {
      imgUrl: '/images/EventBannerSlide3.jpg',
    },
  ];
  return (
    <div>
      <EventBannerSlide eventBannerSlideList={eventBannerSlideList} />
    </div>
  );
}

export default EventBannerContainer;
