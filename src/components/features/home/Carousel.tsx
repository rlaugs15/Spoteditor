'use client';
import { PostCard } from '@/components/common/Card/PostCard';
import { mockLog } from '@/mocks/mockLog';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      spaceBetween={15}
      pagination={{ type: 'progressbar' }}
      loop
      className="max-w-full custom-swiper"
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      slidesPerGroup={2}
      speed={800}
    >
      {Array.from({ length: 12 }).map((slideContent, idx) => (
        <SwiperSlide key={idx} virtualIndex={idx}>
          <PostCard log={mockLog} vertical />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
