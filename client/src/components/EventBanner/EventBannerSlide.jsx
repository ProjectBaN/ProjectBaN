import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

import testImage1 from '../../asset/images/EventBannerSlide1.jpg';
import testImage2 from '../../asset/images/EventBannerSlide2.jpg';
import testImage3 from '../../asset/images/EventBannerSlide3.jpg';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

function EventBannerSlide() {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <img className="w-full" src={testImage1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={testImage2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={testImage3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default EventBannerSlide;
