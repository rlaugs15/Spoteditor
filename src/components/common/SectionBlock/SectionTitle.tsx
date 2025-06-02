import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subTitle: string;
  boldTarget?: 'title' | 'subTitle';
}

const SectionTitle = ({ title, subTitle, boldTarget }: SectionTitleProps) => {
  return (
    <header className="text-lg font-medium web:text-2xl !leading-[120%] font-untitled">
      <p className={cn('text-light-300', boldTarget === 'title' && 'font-bold')}>{title}</p>
      <p className={cn('text-primary-950', boldTarget === 'subTitle' && 'font-bold')}>{subTitle}</p>
    </header>
  );
};

export default SectionTitle;
