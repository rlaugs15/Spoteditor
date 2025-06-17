'use client';
import { PostCard } from '@/components/common/Card/PostCard';
import { LogWithUserAndAddress } from '@/types/api/common';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = ({ logs }: { logs: LogWithUserAndAddress[] }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [slidesPerGroup, setSlidesPerGroup] = useState(2);

  useEffect(() => {
    const updateSlidesPerGroup = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesPerGroup(2);
      else if (width < 1024) setSlidesPerGroup(3);
      else setSlidesPerGroup(4);
    };

    updateSlidesPerGroup();

    window.addEventListener('resize', updateSlidesPerGroup);
    return () => window.removeEventListener('resize', updateSlidesPerGroup);
  }, []);

  const breakpoints = {
    0: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  };

  return (
    <>
      <span className="w-[80px] ml-auto flex bg-gray-200 h-1 absolute top-[50px] right-0 rounded-full">
        <span
          ref={progressBarRef}
          className="bg-black h-full absolute left-0 top-0 transition-all duration-500 rounded-full "
          style={{ width: '0%' }}
        />
      </span>
      <Swiper
        simulateTouch={true} // 기본값이긴 하지만 명시적으로 넣어주는 것도 좋음
        touchStartPreventDefault={false} // 트랙패드 스크롤을 막지 않도록 설정
        watchSlidesProgress
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        spaceBetween={15}
        className="w-full"
        breakpoints={breakpoints}
        slidesPerGroup={slidesPerGroup}
        speed={800}
        onSlideChange={(swiper) => {
          if (!progressBarRef.current) return;

          const realIndex = swiper.realIndex;
          const progressRatio = Math.min((realIndex + slidesPerGroup) / logs?.length, 1);

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
