import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import '../../../styles/swiperCustom.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

function EventBannerSlide(props) {
  console.log(props.eventBannerSlideList);
  return (
    <div className={``}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={() => console.log('slide change')}
      >
        {props.eventBannerSlideList.map((eventBanner, index) => (
          <SwiperSlide key={index} className=" ">
            <img src={eventBanner.imgUrl} alt="" className="w-full lg:h-BannerSlideImage  mx-auto" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default EventBannerSlide;
