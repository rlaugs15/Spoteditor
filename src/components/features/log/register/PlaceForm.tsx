'use client';
import { ClockIcon, LocationIcon } from '@/components/common/Icons';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import PhotoTextSection from './PhotoTextSection';
import PlaceDrawer from './PlaceDrawer';

interface PlaceFormProps {
  idx: number;
  onDeletePlace: (idx: number) => void;
  onMoveUpPlace: (idx: number) => void;
  onMoveDownPlace: (idx: number) => void;
  edit?: boolean;
}

const PlaceForm = ({
  idx,
  onDeletePlace,
  onMoveUpPlace,
  onMoveDownPlace,
  edit,
}: PlaceFormProps) => {
  const { control } = useFormContext();
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-text-lg font-bold">{String(idx + 1).padStart(2, '0')}</span>
        <PlaceDrawer
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          onDeletePlace={() => onDeletePlace(idx)}
          onMoveUpPlace={() => onMoveUpPlace(idx)}
          onMoveDownPlace={() => onMoveDownPlace(idx)}
        />
      </div>
      <FormField
        control={control}
        name={`places.${idx}.placeName`}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="장소명을 적어주세요 *"
            className="placeholder:text-light-300 font-bold !text-text-lg"
          />
        )}
      />

      <div>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <FormField
            control={control}
            name={`places.${idx}.category`}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="장소 카테고리 *"
                className="!text-text-sm"
              />
            )}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <LocationIcon />
          <FormField
            control={control}
            name={`places.${idx}.location`}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="위치를 적어주세요. *"
                className="!text-text-sm"
              />
            )}
          />
        </div>
      </div>

      <PhotoTextSection idx={idx} edit={edit} />
    </div>
  );
};

export default PlaceForm;
