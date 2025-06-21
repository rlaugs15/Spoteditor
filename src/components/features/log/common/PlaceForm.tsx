'use client';
import { LocationIcon, MapIcon } from '@/components/common/Icons';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CATEGORIES } from '@/constants/categoryData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import PhotoTextSection from '../register/PhotoTextSection';
import PlaceDrawer from '../register/PlaceDrawer';
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
  const { control, formState } = useFormContext();
  const [isChecked, setIsChecked] = useState(false);
  const placeErrors = Array.isArray(formState.errors.places)
    ? formState.errors.places[idx]
    : undefined;

  return (
    <div className="py-[5px]">
      <>
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
              className={cn(
                'placeholder:text-light-300 font-bold !text-text-lg',
                placeErrors?.placeName && 'placeholder:text-error-500'
              )}
            />
          )}
        />
      </>
      <div className="pt-2.5 pb-[5px] space-y-2">
        <div className="flex items-center gap-1.5">
          <LocationIcon className="shrink-0" />
          <FormField
            control={control}
            name={`places.${idx}.location`}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="위치를 적어주세요. *"
                className={cn(
                  '!text-text-sm h-6',
                  placeErrors?.location && 'placeholder:text-error-500'
                )}
              />
            )}
          />
        </div>

        <div>
          <div className="flex items-center web:items-baseline gap-1.5">
            <MapIcon className="shrink-0" />
            <FormField
              control={control}
              name={`places.${idx}.category`}
              render={({ field }) => (
                <div className="overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide">
                  <ToggleGroup
                    type="single"
                    value={field.value ?? ''}
                    onValueChange={(value) => field.onChange(value)}
                    className="flex gap-1.5 web:flex-wrap"
                  >
                    {CATEGORIES.map((category) => (
                      <ToggleGroupItem
                        key={category}
                        value={category}
                        className="text-text-sm !text-light-400 rounded-full min-w-[58px] h-[24px] w-fit px-3 border"
                      >
                        {category}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <PhotoTextSection idx={idx} edit={edit} />
    </div>
  );
};

export default PlaceForm;
