'use client';
import Loading from '@/components/common/Loading/Loading';
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
import { useState } from 'react';
interface ConfirmRegistrationDialogProps {
  edit?: boolean;
  logTitle?: string;
  onSubmitLogForm: () => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

const ConfirmRegistrationDialog = ({
  edit,
  logTitle,
  onSubmitLogForm,
  disabled,
  loading,
}: ConfirmRegistrationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async () => {
    try {
      await onSubmitLogForm();
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size={'xl'} className="font-bold w-full mt-2 mb-6 text-[13px]" disabled={disabled}>
          {loading ? <Loading className="max-h-fit size-24" /> : '제출'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-2xl font-bold">
            <span className="text-info-500">{logTitle} </span>
            로그를 {edit ? '수정' : '등록'}하시겠어요?
          </AlertDialogTitle>
          <AlertDialogDescription hidden>{logTitle}로그를 등록하시겠어요?</AlertDialogDescription>
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

export default ConfirmRegistrationDialog;
