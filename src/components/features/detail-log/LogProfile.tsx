import { getUser } from '@/app/actions/user';
import FollowingButton from '@/components/common/Button/FollowingButton';
import LogProfileLink from './LogProfileLink';

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
        <LogProfileLink userId={userId} userImage={userImage} userNickname={userNickname} />
        {me && me?.user_id !== userId && <FollowingButton userId={userId} />}
      </div>
    </div>
  );
};

export default LogProfile;
