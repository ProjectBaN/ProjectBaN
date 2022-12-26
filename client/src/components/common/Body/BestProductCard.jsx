import React from 'react';
import product1 from '../../../asset/images/product1.jpg';
import product2 from '../../../asset/images/product2.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

function BestProductCard() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-PCsm mt-PCbase">
        <p className="self-start font-subtitle text-2xl font-bold">베스트상품</p>
        <a href="" className="self-end font-subtitle">
          전체보기<i className="fa-solid fa-circle-arrow-right ml-1"></i>
        </a>
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={() => console.log('slide change')}
        className="mt-PCsm"
      >
        <SwiperSlide>
          <div className="flex flex-row gap-PCmd ">
            <div className="product1 card">
              <img src={product1} alt="" />
              <p className="text-sm">상품1 </p>
              <p className="text-base font-bold">10,400원</p>
            </div>
            <div className="product2 card">
              <img src={product1} alt="" />
              <p className="text-sm">상품2</p>
              <p className="text-base font-bold">9,000원</p>
            </div>
            <div className="product3 card">
              <img src={product1} alt="" />
              <p className="text-sm">상품3</p>
              <p className="text-base font-bold">12,000원</p>
            </div>
            <div className="product4 card">
              <img src={product1} alt="" />
              <p className="text-sm">상품4</p>
              <p className="text-base font-bold">19,000원</p>
            </div>
            <div className="product5 card">
              <img src={product1} alt="" />
              <p className="text-sm">상품5</p>
              <p className="text-base font-bold">20,000원</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-row gap-PCmd ">
            <div className="product1 card ">
              <img src={product2} alt="" />
              <p className="text-sm">상품1</p>
              <p className="text-base font-bold">11,000원</p>
            </div>
            <div className="product2 card">
              <img src={product2} alt="" />
              <p className="text-sm">상품2</p>
              <p className="text-base font-bold">14,000원</p>
            </div>
            <div className="product3 card">
              <img src={product2} alt="" />
              <p className="text-sm">상품3</p>
              <p className="text-base font-bold">100,000원</p>
            </div>
            <div className="product4 card">
              <img src={product2} alt="" />
              <p className="text-sm">상품4</p>
              <p className="text-base font-bold">101,000원</p>
            </div>
            <div className="product5 card">
              <img src={product2} alt="" />
              <p className="text-sm">상품</p>
              <p className="text-base font-bold">102,000원</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default BestProductCard;
