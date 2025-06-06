'use client';

import Loading from '@/components/common/Loading/Loading';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { Dispatch, SetStateAction, useTransition } from 'react';

interface AccountDeleteButtonProps {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setMsg: Dispatch<SetStateAction<string>>;
}

export default function AccountDeleteButton({ setIsSuccess, setMsg }: AccountDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (isPending) return;

    startTransition(async () => {
      const res = await fetch('/api/user', { method: 'POST' });
      const result = await res.json();

      if (result.success) {
        const supabase = createClient();
        await supabase.auth.signOut(); // 쿠키 삭제
        setIsSuccess(true);
      }
      setMsg(result.msg);
    });
  };
  return (
    <Button onClick={handleDelete} size="sm" className="w-[100px] text-[13px]">
      {isPending ? <Loading /> : '확인'}
    </Button>
  );
}
