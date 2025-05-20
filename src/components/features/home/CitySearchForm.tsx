import { Button } from '@/components/ui/button';
import CityInfoBox from './CityInfoBox';

const CitySearchForm = () => {
  return (
    <div className="flex flex-col web:grid web:grid-cols-[auto_70px] gap-2.5">
      <div className="flex gap-2.5">
        <CityInfoBox label="어디로 놀러갈까요?" value="서울" className="flex-1" />
        <CityInfoBox label="더 상세히 검색!" value="종로구" className="flex-1" />
      </div>
      <Button className="h-full rounded-none !text-text-md font-medium w-full bg-light-950">
        검색
      </Button>
    </div>
  );
};

export default CitySearchForm;
