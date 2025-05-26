import LogProfile from './LogProfile';

interface LogAuthorIntroProps {
  userId: string;
  logDescription: string;
}

const LogAuthorIntro = ({ userId, logDescription }: LogAuthorIntroProps) => {
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] py-5 space-y-1">
      <LogProfile userId={userId} />
      <pre className="text-light-400 text-text-sm web:text-text-lg py-1.5 pre">
        {logDescription}
      </pre>
    </div>
  );
};

export default LogAuthorIntro;
