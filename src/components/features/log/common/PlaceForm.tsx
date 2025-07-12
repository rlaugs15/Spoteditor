'use client';
import { LocationIcon, MapIcon } from '@/components/common/Icons';
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

  // 로그 등록 vs 로그 수정에 따라 필드명 결정
  const fieldName = isEditPage
    ? type === 'existing'
      ? `places.${idx}`
      : `addedPlace.${idx}`
    : `places.${idx}`; // 로그 등록에서는 항상 places.${idx}
  const placeErrors = (formState.errors as any)[
    isEditPage ? (type === 'existing' ? 'places' : 'addedPlace') : 'places'
  ]?.[idx];

  const tLog = useTranslations('Register.LogPage');
  const tCategory = useTranslations('Category');
  return (
    <div>
      <ImageSection idx={idx} fieldName={fieldName} edit={isEditPage && type === 'existing'} />

      <div className="flex justify-between h-[16px]">
        <span className="text-text-lg font-bold">
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

      <FormField
        control={control}
        name={`${fieldName}.placeName`}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder={`${tLog('placeNameLabel')} *`}
            className={cn(
              'font-medium !text-text-lg placeholder:text-light-300',
              placeErrors?.placeName && 'placeholder:text-error-500'
            )}
          />
        )}
      />

      <div className="py-4 space-y-2">
        <div className="flex items-center gap-[10px]">
          <LocationIcon className="shrink-0 pt-[2px]" />
          <FormField
            control={control}
            name={`${fieldName}.location`}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder={`${tLog('locationPlaceholder')} *`}
                className={cn(
                  'font-medium !text-text-sm h-6 placeholder:text-light-300 line-height-[10px]',
                  placeErrors?.location && 'placeholder:text-error-500'
                )}
              />
            )}
          />
        </div>

        <div>
          <div className="flex items-center web:items-start gap-2">
            <MapIcon className="shrink-0 pt-1" />
            <FormField
              control={control}
              name={`${fieldName}.category`}
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

      <TextSection idx={idx} fieldName={fieldName} />
    </div>
  );
};

export default PlaceForm;
