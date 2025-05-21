'use client';
import mock from '@/app/assets/mockImg.png';

import { PostCard } from '@/components/common/Card/PostCard';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const log = {
  author: '작성자',
  imageUrl: mock.src,
  title: '로그 제목',
  city: '서울',
  sigungu: '시군구',
};

const Carousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      spaceBetween={15}
      pagination={{ type: 'progressbar' }}
      loop
      className="max-w-full custom-swiper"
      slidesPerView={4}
      slidesPerGroup={2}
      speed={800}
    >
      {Array.from({ length: 12 }).map((slideContent, idx) => (
        <SwiperSlide key={idx} virtualIndex={idx}>
          <PostCard log={log} vertical />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
