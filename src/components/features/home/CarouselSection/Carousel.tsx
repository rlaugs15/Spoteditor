'use client';
import { PostCard } from '@/components/common/Card/PostCard';
import { LogsReseponse } from '@/types/api/log';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CarouselProps {
  logs: LogsReseponse | undefined;
  onReachEnd: () => void;
}

const Carousel = ({ logs, onReachEnd }: CarouselProps) => {
  const swiperRef = useRef<any>(null);
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      spaceBetween={15}
      pagination={{ type: 'progressbar' }}
      loop={false} // 페이지 이동 조건 때문에 loop는 false여야 함
      className="max-w-full custom-swiper"
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onReachEnd={() => {
        onReachEnd(); // 마지막 도달 시 다음 페이지로 변경
      }}
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
      {logs?.data.map((log) => (
        <SwiperSlide key={log?.log_id}>
          <PostCard log={log} vertical />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
