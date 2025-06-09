import { getPublicUser } from '@/app/actions/user';
import LogProfile from './LogProfile';
import SimpleUserProfile from './SimpleUserProfile';

interface LogAuthorIntroProps {
  userId: string;
  logDescription: string;
}

const LogAuthorIntro = async ({ userId, logDescription }: LogAuthorIntroProps) => {
  const user = await getPublicUser(userId);
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] py-5 space-y-1">
      {user && user.nickname ? (
        <LogProfile
          userId={user.user_id}
          userImage={String(user.image_url)}
          userNickname={user.nickname}
        />
      ) : (
        <SimpleUserProfile userImage={String(user?.image_url)} />
      )}
      <pre className="text-light-400 text-text-sm web:text-text-lg py-1.5 pre">
        {logDescription}
      </pre>
    </div>
  );
};

export default LogAuthorIntro;
