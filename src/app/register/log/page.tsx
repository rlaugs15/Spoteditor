'use client';
import { Header3 } from '@/components/common/Header';
import { XInputClearIcon } from '@/components/common/Icons';
import PhotoTextSection from '@/components/features/register/log/PhotoTextSection';
import PlaceForm from '@/components/features/register/log/PlaceForm';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { formSchema } from '@/lib/zod/logSchema';
import { LogFormValues } from '@/types/schema/log';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';

const LogPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      logTitle: '',
      thumbnail: undefined,
      logDescription: '',
      places: [
        {
          placeName: '',
          category: '',
          location: '',
          description: '',
          placeImages: [], // 파일 객체, 순서
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray<LogFormValues>({
    control: form.control,
    name: 'places',
  });
  const handleAddNewPlace = () =>
    append({
      placeName: '',
      category: '',
      location: '',
      description: '',
      placeImages: [],
    });
  const handleDeletePlace = (idx: number) => remove(idx);
  const onSubmit = (values: FieldValues) => {
    console.log('제출', values);
  };

  return (
    <div className="flex flex-col h-full">
      <Header3 onAddNewPlace={handleAddNewPlace} />
      <Form {...form}>
        <main className="grow bg-white">
          {/* thumbnail */}
          <>
            <div className="flex items-center border-b border-light-100">
              <FormField
                control={form.control}
                name="logTitle"
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="제목을 입력해주세요.(최대 30자) *"
                      className="!text-text-md my-2"
                      maxLength={30}
                      required
                    />
                    <button
                      className={cn(
                        'p-2 transition-opacity duration-300',
                        form.watch('logTitle').length
                          ? 'opacity-100 pointer-events-auto'
                          : 'opacity-0 pointer-events-none'
                      )}
                      onClick={() => form.setValue('logTitle', '')}
                    >
                      <XInputClearIcon className="cursor-pointer hover:brightness-95" />
                    </button>
                  </>
                )}
              />
            </div>
            <PhotoTextSection thumbnail />
          </>

          {/* places */}
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
      <Button
        variant={'destructive'}
        size={'xl'}
        className="font-bold w-full mt-2 mb-6"
        onClick={() => console.log(form.formState.errors)}
      >
        확인용
      </Button>
      <Button
        size={'xl'}
        className="font-bold w-full mt-2 mb-6"
        onClick={form.handleSubmit(onSubmit)}
      >
        완료
      </Button>
    </div>
  );
};

export default LogPage;
