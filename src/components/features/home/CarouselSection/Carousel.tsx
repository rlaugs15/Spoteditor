'use client';
import { PostCard } from '@/components/common/Card/PostCard';
import { LogWithUserAndAddress } from '@/types/api/common';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = ({ logs }: { logs: LogWithUserAndAddress[] }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const breakpoints = {
    0: { slidesPerView: 2, slidesPerGroup: 2 },
    640: { slidesPerView: 3, slidesPerGroup: 3 },
    1024: { slidesPerView: 4, slidesPerGroup: 4 },
  };

  return (
    <>
      <span className="w-[80px] ml-auto flex bg-gray-200 h-1 absolute top-[50px] right-0 rounded-full">
        <span
          ref={progressBarRef}
          className="bg-black h-full absolute left-0 top-0 transition-all duration-500 rounded-full"
          style={{ width: '0%' }}
        />
      </span>
      <Swiper
        watchSlidesProgress
        modules={[Autoplay, Pagination, Mousewheel]}
        autoplay={{ delay: 3000 }}
        spaceBetween={15}
        mousewheel={{ forceToAxis: true }}
        className="w-full"
        breakpoints={breakpoints}
        speed={800}
        onSlideChange={(swiper) => {
          if (!progressBarRef.current) return;
          const { realIndex, params } = swiper;
          const groupSize = params.slidesPerGroup || 1;
          const progressRatio = Math.min((realIndex + groupSize) / logs.length, 1);
          progressBarRef.current.style.width = `${progressRatio * 100}%`;
        }}
      >
        {logs?.map((log, idx) => (
          <SwiperSlide key={idx} virtualIndex={idx}>
            <PostCard log={log} vertical />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
