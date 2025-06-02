'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AccountDeleteButton from './AccountDeleteButton';

export default function AccountDeleteDialog() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-medium text-red-600 text-text-xs">삭제하기</button>
      </DialogTrigger>
      <DialogContent className="w-[300px] web:w-[390px] p-6">
        <DialogTitle className="w-full font-bold text-text-2xl">계정삭제</DialogTitle>
        <DialogDescription className="w-full mt-2 mb-4 text-primary-500 text-start text-text-sm">
          {!isSuccess ? (
            <span>
              계정을 삭제시 등록된 로그는 영구삭제됩니다.
              <br />
              계정을 삭제하시겠어요?
            </span>
          ) : (
            <span>계정 삭제가 완료되었습니다.</span>
          )}
        </DialogDescription>
        <section className="flex justify-end w-full h-10.5 gap-x-2 font-pretendard">
          {!isSuccess ? (
            <>
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="w-[80px] text-[13px]">
                  취소
                </Button>
              </DialogClose>
              <AccountDeleteButton setIsSuccess={setIsSuccess} />
            </>
          ) : (
            <Button onClick={() => router.push('/')} size="sm" className="w-[100px] text-[13px]">
              확인
            </Button>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
