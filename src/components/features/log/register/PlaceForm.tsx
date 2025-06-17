'use client';
import { LocationIcon, MapIcon } from '@/components/common/Icons';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CATEGORIES } from '@/constants/categoryData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ScrollContainer from 'react-indiana-drag-scroll';
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
  const { control, formState } = useFormContext();
  const [isChecked, setIsChecked] = useState(false);
  const placeErrors = Array.isArray(formState.errors.places)
    ? formState.errors.places[idx]
    : undefined;

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
            className={cn(
              'placeholder:text-light-300 font-bold !text-text-lg',
              placeErrors?.placeName && 'placeholder:text-error-500'
            )}
          />
        )}
      />

      <div>
        <div className="flex items-center gap-1.5">
          <MapIcon className="shrink-0" />
          <FormField
            control={control}
            name={`places.${idx}.category`}
            render={({ field }) => (
              <ScrollContainer className="overflow-x-auto cursor-grab active:cursor-grabbing">
                <ToggleGroup
                  type="single"
                  value={field.value ?? ''}
                  onValueChange={(value) => field.onChange(value)}
                  className="flex gap-1"
                >
                  {CATEGORIES.map((category) => (
                    <ToggleGroupItem
                      key={category}
                      value={category}
                      className="text-text-sm rounded-full px-2.5 py-[1.5px] max-w-fit"
                      variant={'outline'}
                    >
                      {category}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </ScrollContainer>
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
                className={cn(
                  '!text-text-sm',
                  placeErrors?.location && 'placeholder:text-error-500'
                )}
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
