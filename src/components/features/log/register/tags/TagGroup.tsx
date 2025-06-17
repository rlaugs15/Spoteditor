'use client';
import TagButton from './TagButton';

interface TagGroupProps {
  title?: string;
  tags: readonly string[];
  isSelected: (value: string) => boolean;
  onTagClick: (value: string) => void;
}

const TagGroup = ({ title, tags, isSelected, onTagClick }: TagGroupProps) => {
  return (
    <div className="mb-5">
      {title && <h5 className="text-text-xs font-bold py-2.5">{title}</h5>}
      <div className="flex flex-wrap gap-2">
        {tags.map((value) => (
          <TagButton
            key={value}
            value={value}
            isSelected={isSelected(value)}
            onClick={() => onTagClick(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagGroup;
