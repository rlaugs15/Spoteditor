'use client';
import { CheckedCircleIcon, CircleIcon, ClockIcon, LocationIcon } from '@/components/common/Icons';
import { Input } from '@/components/ui/input';
import PhotoTextSection from './PhotoTextSection';

interface PlaceFormProps {
  isChecked?: boolean;
  idx: number;
  onDeletePlace: (idx: number) => void;
}

const PlaceForm = ({ isChecked, idx, onDeletePlace }: PlaceFormProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-text-lg font-bold">{String(idx + 1).padStart(2, '0')}</span>
        <button className="cursor-pointer" onClick={() => onDeletePlace(idx)}>
          {isChecked ? <CheckedCircleIcon /> : <CircleIcon />}
        </button>
      </div>
      <Input
        type="text"
        placeholder="장소명을 적어주세요 *"
        className="placeholder:text-light-300 font-bold !text-text-lg"
      />

      <div>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <Input type="text" placeholder="장소 카테고리 *" className="!text-text-sm" />
        </div>
        <div className="flex items-center gap-1.5">
          <LocationIcon />
          <Input type="text" placeholder="위치를 적어주세요. *" className="!text-text-sm" />
        </div>
      </div>

      <PhotoTextSection />
    </div>
  );
};

export default PlaceForm;
