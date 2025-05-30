'use client';

import LogoutButton from '@/components/common/Button/LogoutButton';
import { AddImageIcon, HeadPhoneIcon, UserIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IUser } from '@/types/api/user';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MyProfileButton from './components/MyProfileButton';

interface UserProfileButtonProps {
  user: IUser;
}

export default function UserProfileButton({ user }: UserProfileButtonProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <Button variant={'ghost'} size={'icon'} className="h-10.5">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        // autoFocus를 끄면 포커스를 잡지 않음(에러방지)
        autoFocus={false}
        className="w-[264px]"
      >
        <DropdownMenuItem className="font-bold text-text-lg flex justify-start gap-[5px] px-4 items-center">
          {/* 체크 아이콘 추가 시 span에 ref={textRef} 추가 */}
          <span className="truncate">{user?.nickname}</span>
          {/* {!isTruncated && <VerifiedLabelIcon />} */}
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-5 focus:bg-white">
          <MyProfileButton user={user} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm">
            <AddImageIcon />
            로그 작성하기
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm"
          >
            <a href="https://tally.so/r/nrYJEo" target="_blank" rel="noopener noreferrer">
              <HeadPhoneIcon />
              문의하기
            </a>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem asChild className="flex items-center justify-start text-text-sm">
            <LogoutButton />
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-start px-4 py-[10px] gap-[15px] text-[#81858F]">
          <Link href="/notice" className="flex">
            <DropdownMenuItem className="p-0">
              <button className="text-text-xs">공지사항</button>
            </DropdownMenuItem>
          </Link>
          <button className="text-text-xs">이용약관</button>
          <button className="text-text-xs">개인정보처리방침</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
