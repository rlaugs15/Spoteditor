'use client';

import { useProfileTabStore } from '@/stores/profileStore';
import SaveLogs from './components/SaveLogs';
import SavePlaces from './components/SavePlaces';
import MyLogs from './components/MyLogs';

interface ProfileContentProps {
  userId: string;
}

export default function ProfileContent({ userId }: ProfileContentProps) {
  const tab = useProfileTabStore((state) => state.tab);

  return (
    <>
      {tab === 'myLog' && <MyLogs userId={userId} />}
      {tab === 'savedLog' && <SaveLogs userId={userId} />}
      {tab === 'savedSpaces' && <SavePlaces userId={userId} />}
    </>
  );
}
