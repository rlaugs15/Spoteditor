'use client';
import ExtraActionButton from '@/components/features/detail-log/ExtraActionButton';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ShareIcon } from '../Icons';

const ClipboardButton = () => {
  const t = useTranslations('Common.toast');

  const copyUrlToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success(t('copySuccess')))
      .catch((err) => {
        toast.error(t('copyError'));
        console.error('클립보드 복사 실패:', err);
      });
  };
  return (
    <ExtraActionButton onClick={() => copyUrlToClipboard()}>
      <ShareIcon />
    </ExtraActionButton>
  );
};

export default ClipboardButton;
