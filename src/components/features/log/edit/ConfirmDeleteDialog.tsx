'use client';
import {
  AlertDialog,
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
import { useTranslations } from 'next-intl';
import { useState } from 'react';
interface ConfirmDeleteDialogProps {
  logTitle: string;
  logId: string;
}

const ConfirmDeleteDialog = ({ logTitle, logId }: ConfirmDeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useLogDeleteMutation();
  const t = useTranslations('LogEditPage.delete');

  const handleSubmit = () => mutate({ logId });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="font-bold text-text-md !text-error-500 px-0 hover:!text-error-400 hover:!bg-transparent"
        >
          {t('delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-2xl font-bold">{logTitle}</AlertDialogTitle>
          <AlertDialogDescription className="text-text-xs">
            {t('confirmMessage')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center justify-center">
          <AlertDialogCancel disabled={isPending} className="w-[100px] h-10.5">
            {t('cancel')}
          </AlertDialogCancel>
          <Button onClick={handleSubmit} disabled={isPending} className="w-[100px] h-10.5">
            {isPending ? (
              <div className="w-5 h-5 border border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              `${t('confirm')}`
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
