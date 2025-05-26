'use client';
import { createLog } from '@/app/actions/log-register';
import { Header3 } from '@/components/common/Header';
import ConfirmRegistrationDialog from '@/components/features/log/register/ConfirmRegistrationDialog';
import PhotoTextSection from '@/components/features/log/register/PhotoTextSection';
import PlaceForm from '@/components/features/log/register/PlaceForm';
import TitledInput from '@/components/features/log/register/TitledInput';
import { Form } from '@/components/ui/form';
import { LogformSchema } from '@/lib/zod/logSchema';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { LogFormValues } from '@/types/schema/log';
import { createFormData } from '@/utils/formatLog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
  const clearTag = useLogCreationStore((state) => state.clearTag);
  const router = useRouter();
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
  const { fields, append, remove } = useFieldArray<LogFormValues>({
    control: form.control,
    name: 'places',
  });

  const handleAddNewPlace = () => append(initialPlace);
  const handleDeletePlace = (idx: number) => remove(idx);
  const onSubmit = async (values: LogFormValues) => {
    const formData = createFormData(values);
    const uploadResult = await createLog(formData);

    if (uploadResult.success) {
      router.replace(`/log/${uploadResult.data}`);
      toast.success('업로드 성공');
      clearTag();
    } else {
      toast.error('업로드 실패');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header3 onAddNewPlace={handleAddNewPlace} />
      <Form {...form}>
        <main className="grow bg-white">
          <TitledInput />
          <PhotoTextSection thumbnail />
          <div className="flex flex-col gap-4">
            {fields.map((field, idx) => (
              <PlaceForm key={field.id} idx={idx} onDeletePlace={handleDeletePlace} />
            ))}
          </div>
        </main>
      </Form>

      {/* footer */}
      <div className="text-text-sm w-full h-12 rounded-md flex items-center justify-center bg-error-50 text-red-500 my-2.5">
        부적절한 이미지 적발시 로그가 삭제될 수 있습니다.
      </div>

      <ConfirmRegistrationDialog
        logTitle={form.getValues('logTitle')}
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
        onSubmitLogForm={form.handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default LogPage;
