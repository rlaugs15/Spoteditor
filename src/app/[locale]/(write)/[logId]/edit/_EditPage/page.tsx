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
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { extractDirtyValues, isImageOrderChanged, isOrderChanged, pickDirtyFields } from './utils';

const LogEditPage = ({ logData }: { logData: DetailLog }) => {
  const { mutateAsync: editMutate, isPending: editIsPending } = useLogEditMutation();
  const { mutateAsync: addPlaceMutate, isPending: addPlaceIsPending } = useAddPlaceMutation();
  const t = useTranslations('LogEditPage');
  const tToast = useTranslations('Toast.PlaceDrawer');
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

  //---------- 기존 장소 ----------
  const {
    fields: existingPlaces,
    remove: existingPlaceRemove,
    swap: existingPlaceSwap,
    append: existingPlaceAppend,
  } = useFieldArray<LogEditFormValues>({
    control: form.control,
    name: 'places',
  });

  // 기존 장소 drawer용
  const {
    handleDeletePlace: handleDeleteExistingPlace,
    handleMovePlaceUp: handleMoveExistingPlaceUp,
    handleMovePlaceDown: handleMoveExistingPlaceDown,
  } = usePlacesHandlers(
    existingPlaces,
    existingPlaceAppend,
    existingPlaceRemove,
    existingPlaceSwap
  );

  // 기존 장소 수정 처리 함수
  const handleEditExistingPlaces = async (dirtyValues: Partial<LogEditFormValues>) => {
    const currentPlaces = form.getValues('places'); // 현재 장소 데이터
    const prevPlaces = places; // 초기값 저장

    const patchedDirtyValues = {
      ...dirtyValues,
      places: currentPlaces.map((place, idx) => {
        const dirtyPlace = dirtyValues.places?.[idx];
        const prevPlace = prevPlaces[idx];
        const imageOrderChanged = isImageOrderChanged(prevPlace?.place_images, place.placeImages);

        return {
          id: place.id,
          order: idx + 1,
          ...pickDirtyFields<LogEditFormValues['places'][number]>(dirtyPlace, [
            'placeName',
            'category',
            'location',
            'description',
          ]),
          ...(imageOrderChanged && { placeImages: place.placeImages }),
        };
      }),
    };

    // console.log(patchedDirtyValues);
    const formData = createFormData(patchedDirtyValues);
    await editMutate({ formData, logId: logData.log_id });
  };

  //---------- 새 장소 ------------
  const {
    fields: addedPlaces,
    append: addedPlaceAppend,
    remove: addedPlaceRemove,
    swap: addedPlaceSwap,
  } = useFieldArray<LogEditFormValues>({
    control: form.control,
    name: 'addedPlace',
  });

  // 새 장소 drawer용
  const {
    handleAddNewPlace,
    handleDeletePlace: handleDeleteNewPlace,
    handleMovePlaceUp: handleMoveNewPlaceUp,
    handleMovePlaceDown: handleMoveNewPlaceDown,
  } = usePlacesHandlers(addedPlaces, addedPlaceAppend, addedPlaceRemove, addedPlaceSwap);

  // 기존 장소와 새 장소를 합쳐서 렌더링
  const allPlaces = [
    ...existingPlaces.map((field, idx) => ({ ...field, type: 'existing', originalIdx: idx })),
    ...addedPlaces.map((field, idx) => ({ ...field, type: 'added', originalIdx: idx })),
  ];

  // 새 장소 추가
  const handleAddNewPlaces = async (newPlaces: LogEditFormValues['addedPlace']) => {
    const existingPlacesCount = form.getValues('places').length;
    const deletedPlacesCount = form.getValues('deletedPlace')?.length || 0;
    const currentExistingPlacesCount = existingPlacesCount - deletedPlacesCount;

    await addPlaceMutate({
      values: newPlaces,
      logId: logData.log_id,
      existingOrderCount: currentExistingPlacesCount,
    });
  };

  // 전체 장소(globalIdx) 기준 위로 이동
  const handleMovePlaceUpGlobal = (globalIdx: number) => {
    if (globalIdx <= 0) return;
    const currentPlace = allPlaces[globalIdx];
    const prevPlace = allPlaces[globalIdx - 1];
    if (currentPlace.type !== prevPlace.type) {
      toast.error(tToast('orderTypeError'), {
        description: tToast('orderTypeErrorDesc'),
      });
      return;
    }
    if (currentPlace.type === 'existing') {
      handleMoveExistingPlaceUp(currentPlace.originalIdx); // 기존 장소
    } else {
      handleMoveNewPlaceUp(currentPlace.originalIdx); // 새 장소
    }
  };

  // 전체 장소(globalIdx) 기준 아래로 이동
  const handleMovePlaceDownGlobal = (globalIdx: number) => {
    if (globalIdx >= allPlaces.length - 1) return;
    const currentPlace = allPlaces[globalIdx];
    const nextPlace = allPlaces[globalIdx + 1];
    if (currentPlace.type !== nextPlace.type) {
      toast.error(tToast('orderTypeError'), {
        description: tToast('orderTypeErrorDesc'),
      });
      return;
    }
    if (currentPlace.type === 'existing') {
      handleMoveExistingPlaceDown(currentPlace.originalIdx);
    } else {
      handleMoveNewPlaceDown(currentPlace.originalIdx);
    }
  };

  /* 변경 상태 확인 */
  const getChangeStatus = () => {
    const values = form.getValues();
    const dirtyValues = extractDirtyValues(form.formState.dirtyFields, values);

    return {
      hasAddedPlace: values.addedPlace.length > 0, // 새로운 장소 추가
      hasFieldChanges: Object.keys(dirtyValues).some((key) => key !== 'addedPlace'),
      hasOrderChanged: isOrderChanged(places, form.getValues('places')),
      isImageOrderChanged: isImageOrderChanged(
        places.map((p) => p.place_images).flat(),
        form
          .getValues('places')
          .map((p) => p.placeImages)
          .flat()
      ),
      dirtyValues,
    };
  };

  const onSubmit = async (values: LogEditFormValues) => {
    trackLogEditEvent('start');

    // 변경 상태 확인
    const { hasAddedPlace, hasFieldChanges, hasOrderChanged, isImageOrderChanged, dirtyValues } =
      getChangeStatus();

    // 새로운 장소가 있으면 먼저 추가
    if (hasAddedPlace) {
      await handleAddNewPlaces(values.addedPlace);
    }
    // 나머지 수정사항 처리
    if (hasFieldChanges || hasOrderChanged || isImageOrderChanged) {
      await handleEditExistingPlaces(dirtyValues);
    }
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
        <main className="grow bg-white pt-[66px]">
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
