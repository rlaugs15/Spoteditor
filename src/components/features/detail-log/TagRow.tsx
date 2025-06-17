import { Badge } from '@/components/ui/badge';

interface TagRowProps {
  items: { tag: string }[];
}

const TagRow = ({ items }: TagRowProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Badge key={item.tag} className="bg-white/30 px-4 py-1.5 rounded-full">
          {item.tag}
        </Badge>
      ))}
    </div>
  );
};

export default TagRow;
