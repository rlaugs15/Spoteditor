'use client';

import { Button } from '@/components/ui/button';
import { IUser } from '@/types/api/user';
import Link from 'next/link';

interface MyProfileButtonProps {
  user: IUser;
  label: string;
  onClick?: () => void;
}

export default function MyProfileButton({ user, label, onClick }: MyProfileButtonProps) {
  return (
    <Link href={`/profile/${user?.user_id}`} onClick={onClick} className="w-full">
      <Button
        disabled={!user}
        className="w-full h-full rounded-[60px] bg-[#F7F7F7] hover:bg-[#F7F7F7]"
      >
        <span className="font-medium text-black text-text-sm">{label}</span>
      </Button>
    </Link>
  );
}
