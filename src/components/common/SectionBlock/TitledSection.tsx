import SectionTitle from './SectionTitle';
interface TitledSectionProps {
  title: string;
  subTitle: string;
  showRefreshNotice?: boolean;
  children: React.ReactNode;
}
const TitledSection = ({
  title,
  subTitle,
  children,
  showRefreshNotice = false,
}: TitledSectionProps) => {
  return (
    <div className="flex flex-col gap-[45px] relative">
      <div className="flex justify-start items-center">
        <SectionTitle title={title} subTitle={subTitle} />
        {showRefreshNotice && (
          <p className="ml-5 text-text-sm web:text-text-lg font-medium text-light-300">
            5분마다 갱신됩니다.
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default TitledSection;
