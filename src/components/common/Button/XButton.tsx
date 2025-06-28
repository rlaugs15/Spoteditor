'use client';

import { useRouter } from '@/i18n/navigation';
import { XIcon } from '../Icons';

export default function XButton() {
  const router = useRouter();
  return (
    <button className="hover:cursor-pointer" onClick={() => router.back()}>
      <XIcon className="w-3 h-3" />
    </button>
  );
}
