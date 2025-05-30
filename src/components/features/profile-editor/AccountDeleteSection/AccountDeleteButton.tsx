'use client';

import { followKeys, logKeys, placeKeys, searchKeys, userKeys } from '@/app/actions/keys';
import { deleteUser } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/queries/user/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useActionState } from 'react';

interface AccountDeleteButtonProps {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}

async function DeleteWithState() {
  await deleteUser();
  return { success: true };
}

export default function AccountDeleteButton({ setIsSuccess }: AccountDeleteButtonProps) {
  const { data: me } = useUser();
  const queryClient = useQueryClient();
  const [state, formAction] = useActionState(DeleteWithState, null);

  if (me && state?.success) {
    const userQueryKeysToRemove = [
      userKeys.all,
      followKeys.all,
      logKeys.log,
      placeKeys.place,
      searchKeys.all,
    ];

    userQueryKeysToRemove.forEach((key) => {
      queryClient.removeQueries({ queryKey: key, exact: false });
    });
    setIsSuccess(!!state.success);
  }
  return (
    <form action={formAction}>
      <Button size="sm" className="w-[100px] text-[13px]">
        확인
      </Button>
    </form>
  );
}
