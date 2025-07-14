'use client';
import { LogEditHeader } from '@/components/common/Header';
import PlaceForm from '@/components/features/log/common/PlaceForm';
import ConfirmRegistrationDialog from '@/components/features/log/register/ConfirmRegistrationDialog';
import MultiTagGroup from '@/components/features/log/register/tags/MultiTagGroup';
import TitledInput from '@/components/features/log/register/TitledInput';
import { Form } from '@/components/ui/form';
import useAddPlaceMutation from '@/hooks/mutations/log/useAddPlaceMutation';
import useLogEditMutation from '@/hooks/mutations/log/useLogEditMutation';
import { usePlacesHandlers } from '@/hooks/usePlacesHandlers';
import { trackLogEditEvent } from '@/lib/analytics';
import { LogEditFormSchema } from '@/lib/zod/logSchema';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { DetailLog } from '@/types/api/log';
import { LogEditFormValues } from '@/types/log';
import { createFormData } from '@/utils/formatLog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Controller, FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LogEditPage = ({ logData }: { logData: DetailLog }) => {
  const { mutateAsync: editMutate, isPending: editIsPending } = useLogEditMutation();
  const { mutateAsync: addPlaceMutate, isPending: addPlaceIsPending } = useAddPlaceMutation();
  const t = useTranslations('LogEditPage');
  const { title, place: places, log_tag, address, log_id } = logData;
  const initializeTags = useLogCreationStore((state) => state.initializeTags);
  const initialMoodTags = log_tag.filter((t) => t.category === 'mood').map((t) => t.tag);
  const initialActivityTags = log_tag.filter((t) => t.category === 'activity').map((t) => t.tag);

  const form = useForm({
    resolver: zodResolver(LogEditFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      logTitle: title,
      places: places.map((place) => ({
        id: place.place_id,
        placeName: place.name,
        category: place.category,
        location: place.address,
        description: place?.description ?? '',
        placeImages: place.place_images,
        order: place.order, // 이미지 순서
      })),
      tags: {
        mood: initialMoodTags,
        activity: initialActivityTags,
      },
      addedPlace: [],
      deletedPlace: [],
      deletedPlaceImages: [],
    },
  });

  useEffect(() => {
    initializeTags({ mood: initialMoodTags, activity: initialActivityTags });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 기존 장소 */
  const {
    fields: existingPlaces,
    remove: existingPlaceRemove,
    swap: existingPlaceSwap,
    append: existingPlaceAppend,
  } = useFieldArray<LogEditFormValues>({
    control: form.control,
    name: 'places',
  });

  // 기존 장소용
  const {
    handleDeletePlace: handleDeleteExistingPlace,
    handleMovePlaceUp: handleMoveExistingPlaceUp,
    handleMovePlaceDown: handleMoveExistingPlaceDown,
  } = usePlacesHandlers(
    existingPlaces,
    existingPlaceAppend,
    existingPlaceRemove,
    existingPlaceSwap,
    t
  );

  // 기존 장소 수정 처리 함수
  const handleEditExistingPlaces = async (dirtyValues: any) => {
    // 순서/이미지 변경이 있으면 order만 업데이트하고, 나머지 필드는 dirtyValues에서 가져오기
    const currentPlaces = form.getValues('places');
    const orderChanged = isOrderChanged();
    const imageOrderChanged = isImageOrderChanged();

    const patchedDirtyValues = {
      ...dirtyValues,
      places:
        orderChanged || imageOrderChanged
          ? currentPlaces.map((place, idx) => {
              const dirtyPlace = dirtyValues.places?.[idx];
              return {
                id: place.id,
                order: idx + 1,
                ...(dirtyPlace && {
                  ...(dirtyPlace.placeName !== undefined && { placeName: dirtyPlace.placeName }),
                  ...(dirtyPlace.category !== undefined && { category: dirtyPlace.category }),
                  ...(dirtyPlace.location !== undefined && { location: dirtyPlace.location }),
                  ...(dirtyPlace.description !== undefined && {
                    description: dirtyPlace.description,
                  }),
                  ...(dirtyPlace.placeImages !== undefined && {
                    placeImages: dirtyPlace.placeImages,
                  }),
                }),
              };
            })
          : dirtyValues.places,
    };
    const formData = createFormData(patchedDirtyValues);
    await editMutate({ formData, logId: logData.log_id });
  };

  /* 새 장소 */
  const {
    fields: addedPlaces,
    append: addedPlaceAppend,
    remove: addedPlaceRemove,
    swap: addedPlaceSwap,
  } = useFieldArray<LogEditFormValues>({
    control: form.control,
    name: 'addedPlace',
  });

  // 새 장소용
  const {
    handleAddNewPlace,
    handleDeletePlace: handleDeleteNewPlace,
    handleMovePlaceUp: handleMoveNewPlaceUp,
    handleMovePlaceDown: handleMoveNewPlaceDown,
  } = usePlacesHandlers(addedPlaces, addedPlaceAppend, addedPlaceRemove, addedPlaceSwap, t);

  // 기존 장소와 새 장소를 합쳐서 렌더링
  const allPlaces = [
    ...existingPlaces.map((field, idx) => ({ ...field, type: 'existing', originalIdx: idx })),
    ...addedPlaces.map((field, idx) => ({ ...field, type: 'added', originalIdx: idx })),
  ];

  // 새 장소 추가
  const handleAddNewPlaces = async (dirtyValues: any) => {
    const existingPlacesCount = form.getValues('places').length;
    const deletedPlacesCount = form.getValues('deletedPlace')?.length || 0;
    const currentExistingPlacesCount = existingPlacesCount - deletedPlacesCount;

    await addPlaceMutate({
      values: dirtyValues['addedPlace'],
      logId: logData.log_id,
      existingOrderCount: currentExistingPlacesCount,
    });
  };

  const onSubmit = async () => {
    // GA 이벤트 추적 - 로그 수정 시작
    trackLogEditEvent('start');

    const dirtyValues = extractDirtyValues(form.formState.dirtyFields, form.getValues());
    const hasAddedPlace = !!dirtyValues.addedPlace && dirtyValues.addedPlace.length > 0;
    const hasOtherChanges = Object.keys(dirtyValues).some((key) => key !== 'addedPlace');
    const orderChanged = isOrderChanged();
    const imageOrderChanged = isImageOrderChanged();

    try {
      // 새로운 장소가 있으면 먼저 추가
      if (hasAddedPlace) {
        await handleAddNewPlaces(dirtyValues);
      }
      // 나머지 수정사항 처리 (dirty, 순서, 이미지 순서 변경 중 하나라도 있으면)
      if (hasOtherChanges || orderChanged || imageOrderChanged) {
        await handleEditExistingPlaces(dirtyValues);
      }
    } catch (error) {
      // mutation의 onError에서 이미 toast를 보여주므로 여기서는 추가 처리하지 않음
      console.error('로그 수정 중 오류:', error);
    }
  };
  // 전체 장소(globalIdx) 기준 위로 이동
  const handleMovePlaceUpGlobal = (globalIdx: number) => {
    if (globalIdx <= 0) return;
    const currentPlace = allPlaces[globalIdx];
    const prevPlace = allPlaces[globalIdx - 1];
    if (currentPlace.type !== prevPlace.type) {
      toast.error('기존과 신규 간 순서 변경은 지원하지 않습니다.', {
        description: '등록 후 변경해주세요.',
      });
      return;
    }
    if (currentPlace.type === 'existing') {
      handleMoveExistingPlaceUp(currentPlace.originalIdx);
    } else {
      handleMoveNewPlaceUp(currentPlace.originalIdx);
    }
  };

  // 전체 장소(globalIdx) 기준 아래로 이동
  const handleMovePlaceDownGlobal = (globalIdx: number) => {
    if (globalIdx >= allPlaces.length - 1) return;
    const currentPlace = allPlaces[globalIdx];
    const nextPlace = allPlaces[globalIdx + 1];
    if (currentPlace.type !== nextPlace.type) {
      toast.error('기존과 신규 간 순서 변경은 지원하지 않습니다.', {
        description: '등록 후 변경해주세요.',
      });
      return;
    }
    if (currentPlace.type === 'existing') {
      handleMoveExistingPlaceDown(currentPlace.originalIdx);
    } else {
      handleMoveNewPlaceDown(currentPlace.originalIdx);
    }
  };

  /* 이미지 순서 변경 확인용 */
  const isImageOrderChanged = () => {
    const currentPlaces = form.getValues('places');
    const initialPlaces = places;
    return currentPlaces.some((current, idx) => {
      const initial = initialPlaces[idx];
      if (!initial) return false;
      const currentImageIds = (current.placeImages || []).map((img: any) => img.place_image_id);
      const initialImageIds = (initial.place_images || []).map((img: any) => img.place_image_id);
      return JSON.stringify(currentImageIds) !== JSON.stringify(initialImageIds);
    });
  };

  /* 순서 변경 확인용 */
  const isOrderChanged = () => {
    const currentIds = form.getValues('places').map((p) => p.id);
    const initialIds = places.map((p) => p.place_id);
    return JSON.stringify(currentIds) !== JSON.stringify(initialIds);
  };

  return (
    <div className="flex flex-col h-full">
      <LogEditHeader
        city={address[0].city}
        sigungu={address[0].sigungu}
        logTitle={title}
        logId={log_id}
        onAddNewPlace={handleAddNewPlace}
      />
      <Form {...form}>
        <main className="grow bg-white pt-[54px]">
          <TitledInput />
          <div className="flex flex-col gap-4">
            {allPlaces.map((field, globalIdx) => {
              return (
                <PlaceForm
                  key={field.id}
                  idx={field.originalIdx} // 각 필드별 인덱스
                  type={field.type as 'existing' | 'added'}
                  isEditPage
                  globalIdx={globalIdx} // 전체 장소 배열에서의 인덱스
                  onDeletePlace={
                    field.type === 'existing' ? handleDeleteExistingPlace : handleDeleteNewPlace
                  }
                  onMoveUpPlace={handleMovePlaceUpGlobal}
                  onMoveDownPlace={handleMovePlaceDownGlobal}
                />
              );
            })}
          </div>
        </main>
        <>
          <Controller
            control={form.control}
            name="tags.mood"
            render={({ field }) => (
              <MultiTagGroup
                title={t('tag.mood')}
                type="mood"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={form.control}
            name="tags.activity"
            render={({ field }) => (
              <MultiTagGroup
                title={t('tag.activity')}
                type="activity"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </>
      </Form>

      {/* footer */}
      <div className="text-text-sm w-full h-9 rounded-md flex items-center justify-center bg-error-50 text-red-500 my-2.5">
        {t('warning.imagePolicy')}
      </div>

      <ConfirmRegistrationDialog
        edit
        disabled={
          !form.formState.isValid ||
          form.formState.isSubmitting ||
          editIsPending ||
          addPlaceIsPending
        }
        loading={editIsPending || addPlaceIsPending}
        onSubmitLogForm={form.handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default LogEditPage;

function extractDirtyValues<T extends FieldValues>(dirtyFields: any, allValues: T): Partial<T> {
  if (!dirtyFields || !allValues) return {};
  if (typeof dirtyFields !== 'object' || dirtyFields === true) return allValues;

  const result: any = Array.isArray(dirtyFields) ? [] : {};

  for (const key in dirtyFields) {
    if (dirtyFields[key] && allValues[key] !== undefined) {
      result[key] =
        dirtyFields[key] === true
          ? allValues[key]
          : extractDirtyValues(dirtyFields[key], allValues[key]);
    }
  }

  return result;
}
