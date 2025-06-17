'use client';
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
import useLogDeleteMutation from '@/hooks/mutations/log/useLogDeleteMutation';
import { useState } from 'react';
interface ConfirmDeleteDialogProps {
  logTitle: string;
  logId: string;
}

const ConfirmDeleteDialog = ({ logTitle, logId }: ConfirmDeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useLogDeleteMutation();
  const handleSubmit = () => mutate({ logId });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="font-bold text-text-md !text-error-500 px-0 hover:!text-error-400 hover:!bg-transparent"
        >
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
