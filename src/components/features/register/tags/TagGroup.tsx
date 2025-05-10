import { Button } from '@/components/ui/button';
import { cityDistricts } from '@/constants/cityData';
import { TAG_SETS } from '@/constants/tagData';

interface TagGroupProps {
  title: string;
  type: keyof typeof TAG_SETS;
  selectedCity?: string;
}
const TagGroup = ({ title, type, selectedCity = '서울' }: TagGroupProps) => {
  const tags = type === 'sigungu' ? cityDistricts[selectedCity] : TAG_SETS[type];
  return (
    <div className="mb-5">
      <h5 className="text-text-xs font-bold py-2.5">{title}</h5>
      <div className="flex flex-wrap gap-2">
        {tags.map((value: string) => (
          <Button key={value} className="!text-text-xs font-bold">
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TagGroup;
