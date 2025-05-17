'use client';

import { useProfileTabStore } from '@/stores/profileStore';
import { useParams } from 'next/navigation';
import SaveLogs from './components/SaveLogs';

export default function ProfileContent() {
  const { userId } = useParams();
  const tab = useProfileTabStore((state) => state.tab);

  return (
    <>
      {tab === 'savedLog' && <SaveLogs userId={String(userId)} />}
    </>
  );
}
