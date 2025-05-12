'use client';

import { logout } from '@/app/actions/user';
import { userKeys } from '@/app/actions/keys';
import { LogoutIcon } from '@/components/common/Icons';
import { useQueryClient } from '@tanstack/react-query';
import { useActionState } from 'react';

async function logoutWithState(_: any, __: FormData) {
  await logout();
  return { success: true };
}

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const [state, formAction] = useActionState(logoutWithState, null);

  if (state?.success) {
    queryClient.removeQueries({ queryKey: userKeys.me() });
  }
  return (
    <form action={formAction}>
      <button className="flex items-center justify-start w-full gap-2 px-4 py-3 rounded-sm cursor-default text-text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-900">
        <LogoutIcon />
        <p>로그아웃</p>
      </button>
    </form>
  );
}
