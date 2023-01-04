import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import '../../../styles/swiperCustom.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

import BestProductCard from './BestProductCard';

function BestProductCardList(props) {
  return (
    <div className="w-full h-full mt-PcBase">
      <div className="flex flex-col lg:flex lg:flex-row lg:items-center lg:justify-between  mt-PCbase px-MbSm lg:px-0">
        <p className="flex  justify-center lg:justify-start font-subtitle text-xl font-bold ">베스트상품</p>
        <a href="" className="flex self-end  items-center text-sm font-subtitle">
          전체보기
          <i className="fa-solid fa-circle-arrow-right pl-MbSm "></i>
        </a>
      </div>
      <Swiper
        className="hidden lg:block"
        spaceBetween={50}
        slidesPerView={3}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={() => console.log('slide change')}
      >
        {props.imageProps.map((bestProduct, index) => (
          <SwiperSlide key={index} className="mt-PcSm ">
            <BestProductCard key={index} imageProps={bestProduct} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-full flex flex-row flex-wrap mt-MbMedium  gap-MbMedium text-xs px-MbSm lg:hidden md:w-full md:flex md:flex-wrap  ">
        {props.imageProps.map((bestProduct, index) => (
          <BestProductCard key={index} imageProps={bestProduct} />
        ))}
      </div>
    </div>
  );
}

export default BestProductCardList;
