'use client';

import { useProfileTabStore } from '@/stores/profileStore';
import { useParams } from 'next/navigation';
import SaveLogs from './components/SaveLogs';
import MyLogs from './components/MyLogs';

export default function ProfileContent() {
  const { userId } = useParams();
  const tab = useProfileTabStore((state) => state.tab);

  return (
    <>
      {tab === 'myLog' && <MyLogs />}
      {tab === 'savedLog' && <SaveLogs userId={String(userId)} />}
    </>
  );
}
