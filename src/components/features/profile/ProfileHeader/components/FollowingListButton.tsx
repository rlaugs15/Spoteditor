'use client';

import { followKeys } from '@/app/actions/keys';
import FollowingButton from '@/components/common/Button/FollowingButton';
import useBottomScrollTrigger from '@/components/common/Header/Header/components/pagenation/useBottomScrollTrigger';
import { XIcon } from '@/components/common/Icons';
import Loading from '@/components/common/Loading/Loading';
import UserImage from '@/components/common/UserImage';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useFollowings from '@/hooks/queries/follow/useFollowings';
import { cn } from '@/lib/utils';
import { Following } from '@/types/api/follow';
import { IUser } from '@/types/api/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

interface FollowingListButtonProps {
  userId: string;
  me: IUser;
  totalCount: number;
}

export default function FollowingListButton({ userId, totalCount, me }: FollowingListButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useFollowings({ userId });

  const scrollRef = useBottomScrollTrigger(fetchNextPage, isFetchingNextPage, 20);

  /* 팔로우 리스트 열닫 시 팔로우 유저 리스트 최신화 */
  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    queryClient.invalidateQueries({ queryKey: followKeys.following(userId) });
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild className="outline-none">
        <button
          disabled={totalCount <= 0}
          className={cn(
            'flex items-center space-x-1',
            totalCount <= 0 ? 'text-light-300' : 'hover:cursor-pointer'
          )}
        >
          <DialogDescription
            className={cn(
              'text-black text-text-md web:text-text-2xl',
              totalCount <= 0 && 'text-light-300'
            )}
          >
            팔로잉
          </DialogDescription>
          <span className="font-bold text-center text-text-md web:text-text-2xl">{totalCount}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[340px] web:w-[348px] h-105 p-0 overflow-hidden">
        <DialogTitle className="grid grid-cols-3 w-full pb-2 text-text-2xl font-bold h-[50px] px-2.5 border-b-[1px] border-b-light-50">
          <div />
          <div className="flex items-center justify-center">
            <span className="text-center">팔로잉</span>
          </div>
          <DialogClose asChild className="flex items-center justify-end w-full py-[13px] web:py-2">
            <div>
              <button className="w-8.5 h-8.5 flex justify-center items-center">
                <XIcon className="w-3 h-3" />
              </button>
            </div>
          </DialogClose>
        </DialogTitle>
        <div className="pr-[5px] w-full">
          <article
            ref={scrollRef}
            className="w-full px-[19px] h-[370px] flex flex-col overflow-y-scroll"
          >
            {isLoading ? (
              <Loading className="w-full pl-[5px]" />
            ) : (
              <>
                {data?.pages?.map((followingList) =>
                  followingList?.data?.map((following: Following) => (
                    <div
                      key={following.user_id}
                      className="flex items-center w-full py-[6px] between justify-between"
                    >
                      <DialogClose asChild>
                        <Link
                          href={`/profile/${following?.user_id}`}
                          className="flex items-center w-full"
                        >
                          <figure className="flex items-center gap-[6px]">
                            <UserImage imgSrc={following.image_url} className="w-11 h-11" />
                            <figcaption className="font-bold text-text-xs">
                              {following.nickname}
                            </figcaption>
                          </figure>
                        </Link>
                      </DialogClose>
                      {me?.user_id === userId && (
                        <div className="z-20">
                          <FollowingButton userId={following.user_id} />
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isFetchingNextPage && <Loading className="w-full h-5" />}
              </>
            )}
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
}
