import { Badge } from '@/components/ui/badge';

interface TagRowProps {
  items: { tag: string }[];
  front?: React.ReactElement;
}

const TagRow = ({ items, front }: TagRowProps) => {
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-2">
      {front}
      {items.map((item) => (
        <Badge key={item.tag} className="bg-white/30 px-4 py-1.5 rounded-full">
          {item.tag}
        </Badge>
      ))}
    </div>
  );
};

export default TagRow;
