import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subTitle: string;
  description?: string;
  boldTarget?: 'title' | 'subTitle';
}

const SectionTitle = ({ title, subTitle, description, boldTarget }: SectionTitleProps) => {
  return (
    <header className="w-full text-lg font-medium web:text-2xl !leading-[120%] font-untitled">
      <div>
        <p className={cn('text-light-400', boldTarget === 'title' && 'font-bold')}>{title}</p>
        <p className={cn('text-light-950', boldTarget === 'subTitle' && 'font-bold')}>{subTitle}</p>
      </div>
      {description && (
        <p className="text-text-sm text-light-200 flex items-end p-0">{description}</p>
      )}
    </header>
  );
};

export default SectionTitle;
