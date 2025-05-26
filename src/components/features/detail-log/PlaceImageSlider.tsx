'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tables } from '@/types/supabase';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
interface PlaceImageSliderProps {
  placeImages: Tables<'place_images'>[];
}

const PlaceImageSlider = ({ placeImages }: PlaceImageSliderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode
        className="w-full"
        spaceBetween={15}
      >
        {placeImages
          .sort((a, b) => a.order - b.order)
          .map((img) => (
            <SwiperSlide
              key={img.place_image_id}
              className="w-[40vw] max-w-[300px] aspect-[3/4] relative"
              onClick={() => setSelectedImage(img.image_path)}
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className=" bg-transparent p-0 flex justify-center items-center border-0 w-full h-1/2 focus-visible:outline-none">
          <DialogHeader>
            <DialogTitle hidden>장소 이미지</DialogTitle>
            <DialogDescription hidden>확대한 장소 이미지</DialogDescription>
          </DialogHeader>
          <Image
            src={getStoragePublicImage(selectedImage as string)}
            alt="장소 이미지"
            fill
            className="object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaceImageSlider;
