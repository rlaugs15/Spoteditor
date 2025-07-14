'use client';
import TagButton from './TagButton';

interface TagGroupProps {
  title?: string;
  tags: readonly string[];
  namespace: string;
  isSelected: (value: string) => boolean;
  onTagClick: (value: string) => void;
}

const TagGroup = ({ title, tags, namespace, isSelected, onTagClick }: TagGroupProps) => {
  return (
    <div className="mb-5">
      {title && <h5 className="text-text-base font-bold py-4">{title}</h5>}
      <div className="flex flex-wrap gap-2">
        {tags.map((value) => (
          <TagButton
            key={value}
            value={value}
            isSelected={isSelected(value)}
            onClick={() => onTagClick(value)}
            namespace={namespace}
          />
        ))}
      </div>
    </div>
  );
};

export default TagGroup;
