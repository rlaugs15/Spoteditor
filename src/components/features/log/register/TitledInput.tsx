import { XInputClearIcon } from '@/components/common/Icons';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useFormContext, useWatch } from 'react-hook-form';

const TitledInput = () => {
  const { control, setValue, formState } = useFormContext();
  const logTitle = useWatch({ control, name: 'logTitle' });
  const isError = !!formState.errors?.logTitle;

  const t = useTranslations('Register.LogPage');

  return (
    <div className="relative flex items-center mt-4">
      <FormField
        control={control}
        name="logTitle"
        render={({ field }) => (
          <>
            <Input
              {...field}
              type="text"
              placeholder={`${t('titlePlaceholder')} *`}
              className={cn(
                'block w-full px-4 py-6 rounded-[8px] bg-light-50 text-black',
                'placeholder:text-light-300 !text-[14px] focus:outline-none',
                isError && 'placeholder:text-error-500'
              )}
              maxLength={30}
              required
            />
            <button
              type="button"
              className={cn(
                'absolute right-2 p-2 transition-opacity duration-300',
                logTitle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              )}
              onClick={() => setValue('logTitle', '')}
            >
              <XInputClearIcon className="cursor-pointer hover:brightness-95" />
            </button>
          </>
        )}
      />
    </div>
  );
};

export default TitledInput;
