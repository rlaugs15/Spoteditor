'use client';
import { updateLog } from '@/app/actions/log-update';
import { LogEditHeader } from '@/components/common/Header';
import ConfirmRegistrationDialog from '@/components/features/log/register/ConfirmRegistrationDialog';
import PhotoTextSection from '@/components/features/log/register/PhotoTextSection';
import PlaceForm from '@/components/features/log/register/PlaceForm';
import { TagGroup } from '@/components/features/log/register/tags';
import TitledInput from '@/components/features/log/register/TitledInput';
import { Form } from '@/components/ui/form';
import { LogEditformSchema } from '@/lib/zod/logSchema';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { DetailLog } from '@/types/api/log';
import { LogEditFormValues } from '@/types/schema/log';
import { createFormData } from '@/utils/formatLog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LogEditPage = ({ logData }: { logData: DetailLog }) => {
  const router = useRouter();
  const { title, thumbnail_url, description, place: places, log_tag, address } = logData;
  const initializeTags = useLogCreationStore((state) => state.initializeTags);
  const moodTags = log_tag.filter((t) => t.category === 'mood').map((t) => t.tag);
  const activityTags = log_tag.filter((t) => t.category === 'activity').map((t) => t.tag);

  useEffect(() => {
    initializeTags({ mood: moodTags, activity: activityTags });
  }, []);

  const form = useForm({
    resolver: zodResolver(LogEditformSchema),
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
      })),
      tags: {
        mood: moodTags,
        activity: activityTags,
      },
    },
  });
  const { fields, remove } = useFieldArray<LogEditFormValues>({
    control: form.control,
    name: 'places',
  });

  const handleDeletePlace = (idx: number) => remove(idx);

  const onSubmit = async (values: LogEditFormValues) => {
    const dirtyFields = form.formState.dirtyFields;
    const dirtyValues = extractDirtyValues(dirtyFields, values);

    console.log(dirtyValues);

    const originalPlaces = form.getValues('places');
    const patchedPlaces = dirtyValues.places?.map(
      (place: LogEditFormValues['places'][number], idx: number) => {
        const original = originalPlaces[idx];
        return {
          ...place,
          id: original?.id,
        };
      }
    );

    const patchedDirtyValues = {
      ...dirtyValues,
      places: patchedPlaces,
    };

    // console.log('변경된 값만:', dirtyValues, patchedDirtyValues);

    const formData = createFormData(patchedDirtyValues);
    // const parseResult = parseFormData<LogEditFormValues>(formData);

    const uploadResult = await updateLog(formData, logData.log_id);
    if (uploadResult.success) {
      router.replace(`/log/${logData.log_id}`);
      toast.success('로그 수정 성공');
    } else {
      toast.error('로그 수정  실패');
    }

    // console.log(uploadResult);
    // console.log(formData);
  };

  return (
    <div className="flex flex-col h-full">
      <LogEditHeader city={address[0].city} sigungu={address[0].sigungu} />
      <Form {...form}>
        <main className="grow bg-white">
          <TitledInput />
          <PhotoTextSection thumbnail />
          <div className="flex flex-col gap-4">
            {fields.map((field, idx) => (
              <PlaceForm key={field.id} idx={idx} onDeletePlace={handleDeletePlace} edit />
            ))}
          </div>
        </main>
        <>
          <TagGroup title="누구와" type="mood" />
          <TagGroup title="어떤 느낌으로" type="activity" />
        </>
      </Form>

      {/* footer */}
      <div className="text-text-sm w-full h-12 rounded-md flex items-center justify-center bg-error-50 text-red-500 my-2.5">
        부적절한 이미지 적발시 로그가 삭제될 수 있습니다.
      </div>

      <ConfirmRegistrationDialog
        edit
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
        onSubmitLogForm={form.handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default LogEditPage;

function extractDirtyValues(dirtyFields: any, allValues: any) {
  if (typeof dirtyFields !== 'object' || dirtyFields === true) return allValues;

  const result: any = Array.isArray(dirtyFields) ? [] : {};
  for (const key in dirtyFields) {
    if (dirtyFields[key]) {
      result[key] = extractDirtyValues(dirtyFields[key], allValues[key]);
    }
  }
  return result;
}
