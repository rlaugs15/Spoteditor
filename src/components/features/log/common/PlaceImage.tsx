import { XRemovePlaceImageIcon } from '@/components/common/Icons';
import Image from 'next/image';

interface PlaceImageProps {
  imageUrl: string;
  onDeleteClick: () => void;
  imageIdx: number;
}

const PlaceImage = ({ imageUrl, onDeleteClick, imageIdx }: PlaceImageProps) => {
  return (
    <>
      <Image
        src={imageUrl}
        fill
        alt="업로드한 장소 이미지"
        className="object-cover"
        unoptimized
        onDragStart={(e) => e.preventDefault()}
      />
      <button onClick={onDeleteClick} type="button" className="absolute top-2 right-2">
        <XRemovePlaceImageIcon className="cursor-pointer hover:brightness-90" />
      </button>

      {imageIdx === 0 && (
        <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded">
          대표
        </div>
      )}

      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {imageIdx + 1}
      </div>
    </>
  );
};

export default PlaceImage;
