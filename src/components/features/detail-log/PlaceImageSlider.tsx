'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Tables } from '@/types/supabase';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageWithLoader from './ImageWithLoader';

interface PlaceImageSliderProps {
  placeImages: Tables<'place_images'>[];
}

const PlaceImageSlider = ({ placeImages }: PlaceImageSliderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleImageClick = (imagePath: string, index: number) => {
    setSelectedImage(imagePath);
    setSelectedImageIndex(index);
  };

  const sortedImages = placeImages.sort((a, b) => a.order - b.order);

  return (
    <>
      <Swiper
        modules={[FreeMode, Mousewheel]}
        slidesPerView="auto"
        freeMode
        mousewheel={{ forceToAxis: true }}
        spaceBetween={15}
        className="w-full cursor-pointer"
      >
        {sortedImages.map((img, index) => (
          <SwiperSlide
            key={img.place_image_id}
            className="w-[40vw] max-w-[300px] aspect-[3/4] relative"
            onClick={() => handleImageClick(img.image_path, index)}
          >
            <ImageWithLoader
              src={getStoragePublicImage(img.image_path as string)}
              alt="장소 이미지"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 600px"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent
          className="bg-transparent p-0 flex justify-center items-center border-0 min-w-[80vw] max-w-[90vw] h-[80vh] shadow-none"
          showCloseButton={false}
        >
          <Swiper
            modules={[Navigation]}
            initialSlide={selectedImageIndex}
            className="w-full h-full"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {sortedImages.map((img) => (
              <SwiperSlide key={img.place_image_id} className="flex items-center justify-center">
                <ImageWithLoader
                  src={getStoragePublicImage(img.image_path as string)}
                  alt="장소 이미지"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={swiperRef.current?.isBeginning}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={swiperRef.current?.isEnd}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <DialogClose asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className="absolute right-4 top-4 z-10 text-white rounded-full p-2"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaceImageSlider;
