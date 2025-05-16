'use client';

import { IUser } from '@/types/api/user';
import { useState } from 'react';
import ProfileTabs from './components/ProfileTabs/ProfileTabs';

interface ProfileTabSectionProps {
  me: IUser;
  userId: string;
}

export default function ProfileTabSection({ me, userId }: ProfileTabSectionProps) {
  const [tab, setTab] = useState<'myLog' | 'savedSpaces' | 'savedLog'>('myLog');
  return (
    <>
      <ProfileTabs me={me} userId={userId} tab={tab} setTab={setTab} />
      <section className="w-full"></section>
    </>
  );
}
