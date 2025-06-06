import { Badge } from '@/components/ui/badge';

const categories: string[] = [
  '로.맨.틱 데이트 코스!',
  '가성비 굿 하루',
  '액티비티한 하루!',
  '감성충전 미술관 데이트',
  '홀로 독서하는 하루',
  '찐하게 소비한 하루',
  '친구랑 다양하고 알차게 보낸 하루',
];
const HeroCategoryList = () => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((category) => (
        <Badge
          key={category}
          className="border border-light-800 py-1.5 px-[14px] rounded-xl bg-transparent"
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default HeroCategoryList;
