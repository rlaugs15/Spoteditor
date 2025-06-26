'use client';
import { FormField } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

interface TextFormProps {
  formFieldName: string;
}

const TextForm = ({ formFieldName }: TextFormProps) => {
  const { control } = useFormContext();
  const t = useTranslations('Register.LogPage');
  return (
    <FormField
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <Textarea
          {...field}
          placeholder={t('contentPlaceholder')}
          className="border-0"
          maxLength={500}
        />
      )}
    />
  );
};

export default TextForm;
