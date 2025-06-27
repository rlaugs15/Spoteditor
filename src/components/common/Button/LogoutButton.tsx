'use client';

import { LogoutIcon } from '@/components/common/Icons';
import useLogoutMutation from '@/hooks/mutations/user/useLogoutMuation';

interface LogoutButtonProps {
  label: string;
}

export default function LogoutButton({ label }: LogoutButtonProps) {
  const { mutate } = useLogoutMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <form onSubmit={handleSubmit}>
      <button className="flex items-center justify-start w-full gap-2 px-4 py-3 rounded-sm cursor-default text-text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-900">
        <LogoutIcon />
        <p>{label}</p>
      </button>
    </form>
  );
}
