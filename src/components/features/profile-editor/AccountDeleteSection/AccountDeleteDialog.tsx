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
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AccountDeleteButton from './AccountDeleteButton';

export default function AccountDeleteDialog() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const t = useTranslations('ProfileEditor.account');
  const c = useTranslations('ProfileEditor.common');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-medium text-red-600 text-text-xs">{t('trigger')}</button>
      </DialogTrigger>
      <DialogContent className="w-[300px] web:w-[390px] p-6">
        <DialogTitle className="w-full font-bold text-text-2xl">{t('dialog.title')}</DialogTitle>
        <DialogDescription className="w-full mt-2 mb-4 !text-primary-500 text-start !text-text-sm">
          {!isSuccess ? (
            <span>{t('dialog.confirm')}</span>
          ) : (
            <span>{msg || t('dialog.success')}</span>
          )}
        </DialogDescription>
        <section className="flex justify-end w-full h-10.5 gap-x-2 font-pretendard">
          {!isSuccess ? (
            <>
              <DialogClose asChild>
                <Button variant="outline" size="sm" className="w-[80px] text-[13px]">
                  {c('cancel')}
                </Button>
              </DialogClose>
              <AccountDeleteButton setIsSuccess={setIsSuccess} setMsg={setMsg} />
            </>
          ) : (
            <Button
              onClick={() => window.location.replace('/')}
              size="sm"
              className="w-[100px] text-[13px]"
            >
              {c('ok')}
            </Button>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
