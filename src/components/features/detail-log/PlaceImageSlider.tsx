'use client';
import { Tables } from '@/types/supabase';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface PlaceImageSliderProps {
  placeImages: Tables<'place_images'>[];
}

const PlaceImageSlider = ({ placeImages }: PlaceImageSliderProps) => {
  return (
    <Swiper modules={[FreeMode]} slidesPerView="auto" freeMode className="w-full" spaceBetween={15}>
      {placeImages
        .sort((a, b) => a.order - b.order)
        .map((img) => (
          <SwiperSlide
            key={img.place_image_id}
            className="w-[40vw] max-w-[300px] aspect-[3/4] relative"
          >
            <Image
              src={getStoragePublicImage(img.image_path as string)}
              alt="장소 이미지"
              fill
              className="object-cover"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default PlaceImageSlider;
