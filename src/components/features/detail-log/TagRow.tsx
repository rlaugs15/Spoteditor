import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';

interface TagRowProps {
  items: { tag: string }[];
  front?: React.ReactElement;
}

const TagRow = async ({ items, front }: TagRowProps) => {
  const t = await getTranslations('MoodTags');
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-2">
      {front}
      {items.map((item) => (
        <Badge key={item.tag} className="bg-white/30 px-4 py-1.5 rounded-full">
          {t(`${item.tag}`)}
        </Badge>
      ))}
    </div>
  );
};

export default TagRow;
