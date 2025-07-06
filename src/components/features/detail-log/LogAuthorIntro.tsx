import LogProfile from './LogProfile';

interface LogAuthorIntroProps {
  userId: string;
  userNickname: string;
  userImgUrl: string;
}

const LogAuthorIntro = async ({ userId, userNickname, userImgUrl }: LogAuthorIntroProps) => {
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] py-5 space-y-1">
      <LogProfile userId={userId} userImage={userImgUrl} userNickname={userNickname} />
    </div>
  );
};

export default LogAuthorIntro;
