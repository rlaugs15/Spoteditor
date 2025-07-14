'use client';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CATEGORIES } from '@/constants/categoryData';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import PlaceDrawer from '../register/PlaceDrawer';
import ImageSection from '../register/place-item/ImageSection';
import TextSection from '../register/place-item/TextSection';

interface PlaceFormProps {
  idx: number;
  type?: 'existing' | 'added';
  globalIdx?: number;
  isEditPage?: boolean;
  onDeletePlace: (globalIdx: number) => void;
  onMoveUpPlace: (globalIdx: number) => void;
  onMoveDownPlace: (globalIdx: number) => void;
}

const PlaceForm = ({
  idx,
  type = 'existing',
  globalIdx, // 기존 + 추가장소 포함 인덱스
  isEditPage = false,
  onDeletePlace,
  onMoveUpPlace,
  onMoveDownPlace,
}: PlaceFormProps) => {
  const { control, formState } = useFormContext();
  const [isChecked, setIsChecked] = useState(false);

  const fieldName = isEditPage
    ? type === 'existing'
      ? `places.${idx}`
      : `addedPlace.${idx}`
    : `places.${idx}`;

  const placeErrors = (formState.errors as any)[
    isEditPage ? (type === 'existing' ? 'places' : 'addedPlace') : 'places'
  ]?.[idx];

  const tLog = useTranslations('Register.LogPage');
  const tCategory = useTranslations('Category');

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <span className="text-[14px] font-semibold text-black">
          {String((globalIdx ?? idx) + 1).padStart(2, '0')}
        </span>
        <PlaceDrawer
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          onDeletePlace={() => onDeletePlace(globalIdx ?? idx)}
          onMoveUpPlace={() => onMoveUpPlace(globalIdx ?? idx)}
          onMoveDownPlace={() => onMoveDownPlace(globalIdx ?? idx)}
        />
      </div>

      <ImageSection idx={idx} fieldName={fieldName} edit={isEditPage && type === 'existing'} />

      <div className="mt-2">
        {/* Place Name */}
        <FormField
          control={control}
          name={`${fieldName}.placeName`}
          render={({ field }) => (
            <div className="space-y-1">
              <label className="block text-[14px] font-semibold text-black">
                {tLog('placeNameLabel')}
                <span className="text-error-500"> *</span>
              </label>
              <Input
                {...field}
                type="text"
                placeholder={`${tLog('placeNamePlaceholder')}`}
                className={cn(
                  'block w-full px-4 py-5 rounded-[8px] bg-light-50 text-black',
                  'placeholder:text-light-300 !text-[14px] focus:outline-none',
                  placeErrors?.placeName && 'placeholder:text-error-500'
                )}
              />
            </div>
          )}
        />

        {/* Address or Location */}
        <div className="mt-4 mb-2">
          <FormField
            control={control}
            name={`${fieldName}.location`}
            render={({ field }) => (
              <div className="space-y-1">
                <label className="block text-[14px] font-semibold text-black">
                  {tLog('locationLabel')}
                  <span className="text-error-500"> *</span>
                </label>
                <Input
                  {...field}
                  type="text"
                  placeholder={`${tLog('locationPlaceholder')}`}
                  className={cn(
                    'block w-full px-4 py-5 rounded-[8px] bg-light-50 text-black',
                    'placeholder:text-light-300 !text-[14px]  focus:outline-none',
                    placeErrors?.location && 'placeholder:text-error-500'
                  )}
                />
              </div>
            )}
          />
        </div>
        {/* Category */}
        <div className="mt-0">
          <div className="flex items-center web:items-start gap-2">
            {/* <MapIcon className="shrink-0 pt-1" /> */}
            <FormField
              control={control}
              name={`${fieldName}.category`}
              render={({ field }) => (
                <div className="overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide">
                  <ToggleGroup
                    type="single"
                    value={field.value ?? ''}
                    onValueChange={(value) => field.onChange(value)}
                    className="flex gap-[4px] web:flex-wrap"
                  >
                    {CATEGORIES.map((category) => (
                      <ToggleGroupItem
                        key={category}
                        value={category}
                        className="text-[12px] !text-light-300 rounded-full min-w-[50px] h-[26px] w-fit px-3 border"
                      >
                        {tCategory(category)}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <TextSection idx={idx} fieldName={fieldName} />
      </div>
    </div>
  );
};

export default PlaceForm;
