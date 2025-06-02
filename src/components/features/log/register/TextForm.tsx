'use client';
import { FormField } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

interface TextFormProps {
  formFieldName: string;
}

const TextForm = ({ formFieldName }: TextFormProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <Textarea {...field} placeholder="내용을 입력해주세요. (최대 500자)" maxLength={500} />
      )}
    />
  );
};

export default TextForm;
