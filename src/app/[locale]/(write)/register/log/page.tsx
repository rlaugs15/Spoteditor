'use client';

import { LogRegisterHeader } from '@/components/common/Header';
import PlaceForm from '@/components/features/log/common/PlaceForm';
import ConfirmRegistrationDialog from '@/components/features/log/register/ConfirmRegistrationDialog';
import TitledInput from '@/components/features/log/register/TitledInput';
import { Form } from '@/components/ui/form';
import { HOME } from '@/constants/pathname';
import useLogCreateMutation from '@/hooks/mutations/log/useLogCreateMutation';
import { INITIAL_PLACE, usePlacesHandlers } from '@/hooks/usePlacesHandlers';
import { useRouter } from '@/i18n/navigation';
import { trackLogCreateEvent } from '@/lib/analytics';
import { LogFormSchema } from '@/lib/zod/logSchema';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { LogFormValues } from '@/types/log';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LogPage = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogCreateMutation();
  const t = useTranslations('Register.LogPage');

  const country = useLogCreationStore((state) => state.country);
  const city = useLogCreationStore((state) => state.city);
  const sigungu = useLogCreationStore((state) => state.sigungu);
  const mood = useLogCreationStore((state) => state.mood);
  const activity = useLogCreationStore((state) => state.activity);
  const hydrated = useLogCreationStore((state) => state.hydrated);

  const form = useForm<LogFormValues>({
    resolver: zodResolver(LogFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      logTitle: '',
      places: [INITIAL_PLACE],
      tags: {
        mood,
        activity,
      },
      address: {
        country,
        city,
        sigungu,
      },
    },
  });

  useEffect(() => {
    if (!hydrated) return;

    if (!country || !city || !sigungu) {
      toast.error('등록할 장소가 선택되지 않았습니다. 다시 시도해주세요.');
      router.replace(HOME);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { fields, append, remove, swap } = useFieldArray<LogFormValues>({
    control: form.control,
    name: 'places',
  });

  // 장소 관련 핸들러
  const { handleAddNewPlace, handleDeletePlace, handleMovePlaceUp, handleMovePlaceDown } =
    usePlacesHandlers(fields, append, remove, swap, t);

  const onSubmit = async (values: LogFormValues) => {
    // GA 이벤트 추적 - 로그 등록 시작
    trackLogCreateEvent('start');

    // console.log(values, { values });
    mutate(values);
  };

  return (
    <div className="flex flex-col h-full">
      <LogRegisterHeader onAddNewPlace={handleAddNewPlace} />
      <Form {...form}>
        <main className="grow bg-white pt-[54px]">
          <TitledInput />
          <div className="flex flex-col">
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
          <button
            type="button"
            className="image-upload-button"
            onClick={handleAddNewPlace}
            disabled={fields.length >= 10}
          >
            <Plus className="text-light-500 size-4" /> {t('addPlace')}
          </button>
        </main>
      </Form>

      {/* footer */}
      <div className="text-[13px] w-full h-9 rounded-md flex items-center justify-center bg-error-50 text-red-500 my-2.5">
        {t('deleteWarning')}
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
