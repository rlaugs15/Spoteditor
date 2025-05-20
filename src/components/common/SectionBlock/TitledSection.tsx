import SectionTitle from './SectionTitle';
interface TitledSectionProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}
const TitledSection = ({ title, subTitle, children }: TitledSectionProps) => {
  return (
    <div className="flex flex-col gap-[45px]">
      <SectionTitle title={title} subTitle={subTitle} />
      {children}
    </div>
  );
};

export default TitledSection;
