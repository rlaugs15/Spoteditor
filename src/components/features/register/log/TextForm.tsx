'use client';
import { Textarea } from '@/components/ui/textarea';

const TextForm = () => {
  return <Textarea placeholder="내용을 입력해주세요. (최대 500자)" maxLength={500} />;
};

export default TextForm;
