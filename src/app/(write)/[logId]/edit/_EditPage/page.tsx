'use client';
import { LogEditHeader } from '@/components/common/Header';
import PlaceForm from '@/components/features/log/common/PlaceForm';
import ConfirmRegistrationDialog from '@/components/features/log/register/ConfirmRegistrationDialog';
import PhotoTextSection from '@/components/features/log/register/PhotoTextSection';
import MultiTagGroup from '@/components/features/log/register/tags/MultiTagGroup';
import TitledInput from '@/components/features/log/register/TitledInput';
import { Form } from '@/components/ui/form';
import useAddPlaceMutation from '@/hooks/mutations/log/useAddPlaceMutation';
import useLogEditMutation from '@/hooks/mutations/log/useLogEditMutation';
import { LogEditFormSchema } from '@/lib/zod/logSchema';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { DetailLog } from '@/types/api/log';
import { LogEditFormValues } from '@/types/log';
import { createFormData } from '@/utils/formatLog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LogEditPage = ({ logData }: { logData: DetailLog }) => {
  const { mutate: editMutate, isPending: editIsPending } = useLogEditMutation();
  const { mutate: addPlaceMutate, isPending: addPlaceIsPending } = useAddPlaceMutation();
  const { title, thumbnail_url, description, place: places, log_tag, address, log_id } = logData;
  const initializeTags = useLogCreationStore((state) => state.initializeTags);
  const moodTags = log_tag.filter((t) => t.category === 'mood').map((t) => t.tag);
  const activityTags = log_tag.filter((t) => t.category === 'activity').map((t) => t.tag);
  const mood = useLogCreationStore((state) => state.mood);
  const activity = useLogCreationStore((state) => state.activity);

  const form = useForm({
    resolver: zodResolver(LogEditFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      logTitle: title,
      thumbnail: thumbnail_url,
      logDescription: description ?? '',
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
        mood: moodTags,
        activity: activityTags,
      },
      addedPlace: [],
      deletedPlace: [],
      deletedPlaceImages: [],
    },
  });

  useEffect(() => {
    initializeTags({ mood: moodTags, activity: activityTags });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setValue('tags.mood', mood, { shouldDirty: true });
  }, [form, mood]);

  useEffect(() => {
    form.setValue('tags.activity', activity, { shouldDirty: true });
  }, [form, activity]);

  /* 기존 장소 */
  const {
    fields: existingPlaces,
    remove: existingPlaceRemove,
    swap: existingPlaceSwap,
  } = useFieldArray<LogEditFormValues>({
    control: form.control,
    name: 'places',
  });

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

  // 기존 장소와 새 장소를 합쳐서 렌더링
  const allPlaces = [
    ...existingPlaces.map((field, idx) => ({ ...field, type: 'existing', originalIdx: idx })),
    ...addedPlaces.map((field, idx) => ({ ...field, type: 'added', originalIdx: idx })),
  ];

  console.log('allPlaces', allPlaces);

  const handleAddNewPlace = () => {
    if (allPlaces.length >= 10) {
      toast.info('장소는 최대 10개까지 등록 가능합니다.');
      return;
    }
    addedPlaceAppend({
      placeName: '',
      category: '',
      location: '',
      description: '',
      placeImages: [],
    });
  };

  const handleDeletePlace = (globalIdx: number) => {
    if (allPlaces.length === 1) {
      toast.error('1개의 장소는 필수입니다.');
      return;
    }

    const place = allPlaces[globalIdx];

    if (place.type === 'existing') {
      // 기존 장소 삭제
      const deletedPlaceId = form.getValues(`places.${place.originalIdx}.id`);
      if (deletedPlaceId) {
        const prevDeleted = form.getValues('deletedPlace') ?? [];
        form.setValue('deletedPlace', [...prevDeleted, deletedPlaceId], { shouldDirty: true });
      }
      existingPlaceRemove(place.originalIdx);
    } else {
      // 새로 추가된 장소 삭제
      addedPlaceRemove(place.originalIdx);
    }
  };

  const handleMovePlaceUp = (globalIdx: number) => {
    if (globalIdx <= 0) return;

    const currentPlace = allPlaces[globalIdx];
    const prevPlace = allPlaces[globalIdx - 1];

    if (currentPlace.type === prevPlace.type) {
      // 같은 타입끼리 순서 변경
      if (currentPlace.type === 'existing') {
        existingPlaceSwap(currentPlace.originalIdx, prevPlace.originalIdx);
      } else {
        addedPlaceSwap(currentPlace.originalIdx, prevPlace.originalIdx);
      }
    } else {
      toast.error('기존과 신규 간 순서 변경은 지원하지 않습니다.');
    }
  };

  const handleMovePlaceDown = (globalIdx: number) => {
    if (globalIdx >= allPlaces.length - 1) return;

    const currentPlace = allPlaces[globalIdx];
    const nextPlace = allPlaces[globalIdx + 1];

    if (currentPlace.type === 'existing' && nextPlace.type === 'existing') {
      existingPlaceSwap(currentPlace.originalIdx, nextPlace.originalIdx);
    } else if (currentPlace.type === 'added' && nextPlace.type === 'added') {
      addedPlaceSwap(currentPlace.originalIdx, nextPlace.originalIdx);
    } else {
      toast.error('기존과 신규 간 순서 변경은 지원하지 않습니다.');
    }
  };

  const onSubmit = async (values: LogEditFormValues) => {
    const dirtyValues = extractDirtyValues<LogEditFormValues>(form.formState.dirtyFields, values);

    console.log('dirtyValues', dirtyValues['addedPlace']);

    const hasNewPlaces = dirtyValues['addedPlace'] && dirtyValues['addedPlace'].length > 0;
    const hasOtherChanges =
      dirtyValues && Object.keys(dirtyValues).some((key) => key !== 'addedPlace');

    try {
      // 새로운 장소가 있으면 먼저 추가
      if (hasNewPlaces && dirtyValues['addedPlace']) {
        await addPlaceMutate({ values: dirtyValues['addedPlace'], logId: logData.log_id });
      }

      // 나머지 수정사항 처리
      if (hasOtherChanges) {
        const patchedDirtyValues = {
          ...dirtyValues,
          ...(dirtyValues.places && {
            places: dirtyValues.places.map((place, idx) => ({
              ...place,
              id: form.getValues('places')[idx]?.id,
              order: idx + 1,
            })),
          }),
        };

        console.log('보냅니다', patchedDirtyValues);
        const formData = createFormData(patchedDirtyValues);
        await editMutate({ formData, logId: logData.log_id });
      }
    } catch (error) {
      console.error('로그 수정 중 오류:', error);
      toast.error('로그 수정에 실패했습니다.');
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
        <main className="grow bg-white pt-[54px]">
          <TitledInput />
          <PhotoTextSection thumbnail edit />
          <div className="flex flex-col gap-4">
            {allPlaces.map((field, globalIdx) => {
              return (
                <PlaceForm
                  key={field.id}
                  idx={field.originalIdx} // 각 필드별 인덱스
                  type={field.type as 'existing' | 'added'}
                  isEditPage
                  globalIdx={globalIdx} // 전체 장소 배열에서의 인덱스
                  onDeletePlace={handleDeletePlace}
                  onMoveUpPlace={handleMovePlaceUp}
                  onMoveDownPlace={handleMovePlaceDown}
                />
              );
            })}
          </div>
        </main>
        <>
          <MultiTagGroup title="누구와" type="mood" />
          <MultiTagGroup title="어떤 느낌으로" type="activity" />
        </>
      </Form>

      {/* footer */}
      <div className="text-text-sm w-full h-9 rounded-md flex items-center justify-center bg-error-50 text-red-500 my-2.5">
        부적절한 이미지 적발시 로그가 삭제될 수 있습니다.
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
