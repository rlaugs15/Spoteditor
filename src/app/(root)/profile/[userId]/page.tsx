import { getPublicUser, getUser } from '@/app/actions/user';
import ProfileHeader from '@/components/features/profile/ProfileHeader/ProfileHeader';
import ProfileTabSection from '@/components/features/profile/ProfileTabContent/ProfileTabSection';

interface ProfilepageProps {
  params: Promise<{ userId: string }>;
}

export default async function Page({ params }: ProfilepageProps) {
  const { userId } = await params;
  const me = await getUser();
  const isMe = me?.user_id === userId;

  const user = isMe ? me : await getPublicUser(userId);
  return (
    <main className="pt-7.5 web:pt-15 mx-4 web:mx-12.5 mb-35 web:mb-25">
      <ProfileHeader me={me} user={user} isMe={isMe} />
      <ProfileTabSection me={me} userId={userId} />
    </main>
  );
}
