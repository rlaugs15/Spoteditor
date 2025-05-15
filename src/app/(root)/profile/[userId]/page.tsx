import { getPublicUser, getUser } from '@/app/actions/user';
import ProfileHeader from '@/components/features/profile/ProfileHeader/ProfileHeader';

interface ProfilepageProps {
  params: {
    userId: string;
  };
}

export default async function Page({ params: { userId } }: ProfilepageProps) {
  const me = await getUser();
  const user = await getPublicUser(userId);

  return (
    <div className="pt-7.5 web:pt-15">
      <ProfileHeader me={me} user={user} />
    </div>
  );
}
