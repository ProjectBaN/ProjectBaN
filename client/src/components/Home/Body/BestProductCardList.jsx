import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import BestProductCard from './BestProductCard';

SwiperCore.use([Navigation, Pagination, Autoplay]);
function BestProductCardList(props) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-PCsm mt-PCbase">
        <p className="self-start font-subtitle text-2xl font-bold">베스트상품</p>
        <a href="" className="self-end font-subtitle">
          전체보기<i className="fa-solid fa-circle-arrow-right ml-1"></i>
        </a>
      </div>

      <Swiper
        spaceBetween={25}
        slidesPerView={5}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={() => console.log('slide change')}
        className="mt-PCsm"
      >
        {props.imageProps.map((test, index) => (
          <SwiperSlide key={index}>
            <BestProductCard imageProps={test} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BestProductCardList;
