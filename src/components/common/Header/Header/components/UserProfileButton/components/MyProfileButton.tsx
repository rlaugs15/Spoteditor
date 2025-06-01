'use client';

import { Button } from '@/components/ui/button';
import { IUser } from '@/types/api/user';
import Link from 'next/link';

interface MyProfileButtonProps {
  user: IUser;
}

export default function MyProfileButton({ user }: MyProfileButtonProps) {
  return (
    <Link href={`/profile/${user?.user_id}`} className="w-full">
      <Button disabled={!user} className="w-full h-full rounded-[60px] bg-[#F7F7F7] hover:bg-[#F7F7F7]">
        <span className="font-medium text-black text-text-sm">프로필 보기</span>
      </Button>
    </Link>
  );
}
