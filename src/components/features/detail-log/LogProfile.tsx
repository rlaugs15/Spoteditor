import { getUser } from '@/app/actions/user';
import FollowingButton from '@/components/common/Button/FollowingButton';
import UserImage from '@/components/common/UserImage';
import { PROFILE_PATHS } from '@/constants/pathname';
import Link from 'next/link';

interface LogProfileProps {
  userId: string;
  userImage: string;
  userNickname: string;
}

const LogProfile = async ({ userId, userImage, userNickname }: LogProfileProps) => {
  const me = await getUser();
  return (
    <div className="flex items-start py-1.5">
      <div className="flex items-center gap-4">
        <Link href={`${PROFILE_PATHS.PROFILE}/${userId}`} className="flex gap-2">
          <UserImage imgSrc={userImage} className="w-6 h-6" />
          <span className="text-text-sm web:text-text-md font-semibold">{userNickname}</span>
        </Link>
        {me && me?.user_id !== userId && <FollowingButton userId={userId} />}
      </div>
    </div>
  );
};

export default LogProfile;
