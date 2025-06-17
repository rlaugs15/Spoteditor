'use client';
import { Header3 } from '@/components/common/Header';
import ConfirmRegistrationDialog from '@/components/features/log/register/ConfirmRegistrationDialog';
import PhotoTextSection from '@/components/features/log/register/PhotoTextSection';
import PlaceForm from '@/components/features/log/register/PlaceForm';
import TitledInput from '@/components/features/log/register/TitledInput';
import { Form } from '@/components/ui/form';
import useLogCreateMutation from '@/hooks/mutations/log/useLogCreateMutation';
import { LogformSchema } from '@/lib/zod/logSchema';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { LogFormValues } from '@/types/schema/log';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const initialPlace = {
  placeName: '',
  category: '',
  location: '',
  description: '',
  placeImages: [],
};

const LogPage = () => {
  const { mutate, isPending } = useLogCreateMutation();
  const form = useForm({
    resolver: zodResolver(LogformSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      logTitle: '',
      thumbnail: undefined,
      logDescription: '',
      places: [initialPlace],
      tags: {
        mood: useLogCreationStore.getState().mood,
        activity: useLogCreationStore.getState().activity,
      },
      address: {
        country: useLogCreationStore.getState().country,
        city: useLogCreationStore.getState().city,
        sigungu: useLogCreationStore.getState().sigungu,
      },
    },
  });
  const { fields, append, remove, swap } = useFieldArray<LogFormValues>({
    control: form.control,
    name: 'places',
  });

  const handleAddNewPlace = () => {
    if (fields.length >= 10) {
      toast.info('장소는 최대 10개까지 등록 가능합니다.');
      return;
    }
    append(initialPlace);
  };
  const handleDeletePlace = (idx: number) => remove(idx);
  const handleMovePlaceUp = (idx: number) => {
    if (idx <= 0) return;
    swap(idx, idx - 1);
  };
  const handleMovePlaceDown = (idx: number) => {
    if (idx >= fields.length - 1) return;
    swap(idx, idx + 1);
  };

  const onSubmit = async (values: LogFormValues) => {
    mutate({ values });
  };

  return (
    <div className="flex flex-col h-full">
      <Header3 onAddNewPlace={handleAddNewPlace} />
      <Form {...form}>
        <main className="grow bg-white pt-[54px]">
          <TitledInput />
          <PhotoTextSection thumbnail />
          <div className="flex flex-col gap-4">
            {fields.map((field, idx) => (
              <PlaceForm
                key={field.id}
                idx={idx}
                onDeletePlace={handleDeletePlace}
                onMoveUpPlace={handleMovePlaceUp}
                onMoveDownPlace={handleMovePlaceDown}
              />
            ))}
          </div>
        </main>
      </Form>

      {/* footer */}
      <div className="text-text-sm w-full h-9 rounded-md flex items-center justify-center bg-error-50 text-red-500 my-2.5">
        부적절한 이미지 적발시 로그가 삭제될 수 있습니다.
      </div>

      <ConfirmRegistrationDialog
        logTitle={form.getValues('logTitle')}
        disabled={!form.formState.isValid || form.formState.isSubmitting || isPending}
        loading={isPending}
        onSubmitLogForm={form.handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default LogPage;
