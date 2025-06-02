'use client';
import ExtraActionButton from '@/components/features/detail-log/ExtraActionButton';
import { toast } from 'sonner';
import { ShareIcon } from '../Icons';

const copyUrlToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => toast.success('URL이 클립보드에 복사되었습니다!'))
    .catch((err) => {
      toast.error('URL 복사에 실패했습니다.');
      console.error('클립보드 복사 실패:', err);
    });
};

const ClipboardButton = () => {
  return (
    <ExtraActionButton onClick={() => copyUrlToClipboard()}>
      <ShareIcon />
    </ExtraActionButton>
  );
};

export default ClipboardButton;
