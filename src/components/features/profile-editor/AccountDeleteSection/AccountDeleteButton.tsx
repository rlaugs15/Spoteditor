'use client';

import { followKeys, logKeys, placeKeys, searchKeys, userKeys } from '@/app/actions/keys';
import Loading from '@/components/common/Loading/Loading';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { toast } from 'sonner';

interface AccountDeleteButtonProps {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setMsg: Dispatch<SetStateAction<string>>;
}

export default function AccountDeleteButton({ setIsSuccess, setMsg }: AccountDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    if (isPending) return;

    startTransition(async () => {
      const res = await fetch('/api/user', { method: 'POST' });
      const result = await res.json();

      if (result.success) {
        const supabase = createClient();
        await supabase.auth.signOut(); // 쿠키 삭제

        const keysToRemove = [
          userKeys.all,
          followKeys.all,
          logKeys.all,
          placeKeys.all,
          searchKeys.all,
        ];
        keysToRemove.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });

        setIsSuccess(true);
        toast.success('계정 삭제 성공');
      } else {
        toast.error('계정 삭제 실패');
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
