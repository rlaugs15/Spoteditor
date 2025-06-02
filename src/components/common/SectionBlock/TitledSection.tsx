import SectionTitle from './SectionTitle';
interface TitledSectionProps {
  title: string;
  subTitle: string;
  description?: string;
  children: React.ReactNode;
}
const TitledSection = ({ title, subTitle, description, children }: TitledSectionProps) => {
  return (
    <div className="flex flex-col gap-[45px] relative">
      <SectionTitle title={title} subTitle={subTitle} description={description} />
      {children}
    </div>
  );
};

export default TitledSection;
