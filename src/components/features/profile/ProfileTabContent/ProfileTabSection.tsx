'use client';

import { IUser } from '@/types/api/user';
import ProfileTabs from './components/ProfileTabs/ProfileTabs';
import ProfileContent from './components/ProfileContent/ProfileContent';
interface ProfileTabSectionProps {
  me: IUser;
  userId: string;
}

export default function ProfileTabSection({ me, userId }: ProfileTabSectionProps) {
  return (
    <>
      <ProfileTabs me={me} userId={userId} />
      <section className="w-full">
        <ProfileContent userId={userId} />
      </section>
    </>
  );
}
