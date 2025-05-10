import { CheckedCircleIcon, CircleIcon, ClockIcon, LocationIcon } from '@/components/common/Icons';
import { Input } from '@/components/ui/input';
import PhotoTextForm from './PhotoTextForm';
interface PlaceFormProps {
  isChecked?: boolean;
}

const PlaceForm = ({ isChecked }: PlaceFormProps) => {
  return (
    <div className="px-4">
      <div className="flex justify-between">
        <span className="text-text-lg font-bold">12</span>
        <button className="cursor-pointer">
          {isChecked ? <CheckedCircleIcon /> : <CircleIcon />}
        </button>
      </div>
      <Input
        type="text"
        placeholder="장소명을 적어주세요 *"
        className="placeholder:text-light-300 font-bold !text-text-lg"
      />

      <div className="mb-[15px]">
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <Input type="text" placeholder="장소 카테고리 *" className="!text-text-sm" />
        </div>
        <div className="flex items-center gap-1.5">
          <LocationIcon />
          <Input type="text" placeholder="위치를 적어주세요. *" className="!text-text-sm" />
        </div>
      </div>

      <PhotoTextForm />
    </div>
  );
};

export default PlaceForm;
