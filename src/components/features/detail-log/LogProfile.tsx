import { getUser } from '@/app/actions/user';
import FollowingButton from '@/components/common/Button/FollowingButton';
import UserImage from '@/components/common/UserImage';

interface LogProfileProps {
  userId: string;
  userImage: string;
  userNickname: string;
}

const LogProfile = async ({ userId, userImage, userNickname }: LogProfileProps) => {
  const me = await getUser();
  return (
    <div className="flex items-center gap-2">
      <UserImage imgSrc={userImage} className="w-6 h-6" />
      <span className="text-text-sm web:text-text-md font-semibold">{userNickname}</span>
      {me?.user_id !== userId && <FollowingButton userId={userId} />}
    </div>
  );
};

export default LogProfile;
