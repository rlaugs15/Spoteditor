import { getPublicUser, getUser } from '@/app/actions/user';
import ProfileHeader from '@/components/features/profile/ProfileHeader/ProfileHeader';
import TapNavigation from '@/components/features/profile/TabNavigation/TapNavigation';

interface ProfilepageProps {
  params: {
    userId: string;
  };
}

export default async function Page({ params: { userId } }: ProfilepageProps) {
  const me = await getUser();
  const user = await getPublicUser(userId);

  return (
    <div className="pt-7.5 web:pt-15 mx-4 web:mx-12.5">
      <ProfileHeader me={me} user={user} />
      <section className="w-full">
        <TapNavigation me={me} userId={userId} />
      </section>
    </div>
  );
}
