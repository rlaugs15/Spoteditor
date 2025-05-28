'use client';
import { deleteLog } from '@/app/actions/log';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
interface ConfirmDeleteDialogProps {
  logTitle: string;
  logId: string;
}

const ConfirmDeleteDialog = ({ logTitle, logId }: ConfirmDeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const { success } = await deleteLog(logId);
      if (success) {
        toast.success('로그가 삭제되었습니다.');
        router.replace(HOME);
      } else throw new Error('삭제 실패');
    } catch {
      toast.error('로그 삭제를 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={'ghost'} className="font-bold text-text-md !text-error-500">
          로그 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-2xl font-bold">{logTitle}</AlertDialogTitle>
          <AlertDialogDescription className="text-text-xs">
            로그를 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-8">취소</AlertDialogCancel>
          <AlertDialogAction className="px-8" onClick={handleSubmit}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
