import { BookMarkIcon, ClockIcon, LocationIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';

const LogContent = () => {
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] border-t pt-[15px] web:pt-3 py-10 space-y-[15px]">
      <section className="flex flex-col gap-2 relative">
        <div className="text-text-lg web:text-text-2xl font-bold flex flex-col">
          <span>01</span>
          <span>서촌 베란다</span>
        </div>
        <div>
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <ClockIcon />
            <span>카테고리</span>
          </div>
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <LocationIcon />
            <span>주소</span>
          </div>
        </div>
        <Button variant={'ghost'} size={'icon'} className="absolute right-0">
          <BookMarkIcon />
        </Button>
      </section>

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-[15px] h-[424px]">
          <div className="bg-blue-100">이미지</div>
          <div className="bg-blue-100">이미지</div>
          <div className="bg-blue-100">이미지</div>
        </div>
        <p className="text-text-sm web:text-text-lg text-light-400">
          그저 그날의 날씨, 공간의 분위기, 흘러나오는 음악 소리, 그리고 함께 있는 사람, 그 모든
          것들이 조화롭게 어우러지는 순간.  그럴 때 커피 한 잔이 우리의 감정을 담는 그릇이
          되어특별한 의미를 갖는 것 같아요. 풍류는 옛 선비들이 인격 수양을 위해 자연을 가까이 두고
          멋스럽게 운치를 즐기던 행위를 뜻합니다. 어느 학자는 이런 의미를 두고  멋스럽게
        </p>
      </section>
    </div>
  );
};

export default LogContent;
