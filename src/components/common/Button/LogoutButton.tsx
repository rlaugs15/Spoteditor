'use client';

import { userKeys } from '@/app/actions/keys';
import { logout } from '@/app/actions/user';
import { LogoutIcon } from '@/components/common/Icons';
import { useQueryClient } from '@tanstack/react-query';

export default function LogoutButton() {
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: userKeys.me() });
    //router.refresh()는 클라이언트 캐시 유지하므로 완전 초기화 위해 reload 사용
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="flex items-center justify-start w-full gap-2 px-4 py-3 rounded-sm cursor-default text-text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-900">
        <LogoutIcon />
        <p>로그아웃</p>
      </button>
    </form>
  );
}
