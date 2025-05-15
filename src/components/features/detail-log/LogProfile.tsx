import { Button } from '@/components/ui/button';

const LogProfile = () => {
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] py-5 space-y-1">
      <div className="flex items-center gap-2">
        <div className="bg-red-300 w-6 h-6 rounded-full" />
        <span className="text-text-sm web:text-text-md font-semibold">Teamspoteditor</span>
        <Button size={'sm'} variant={'outline'} className="rounded-full">
          팔로우
        </Button>
      </div>
      <p className="text-light-400 text-text-sm web:text-text-lg py-1.5">
        그저 그날의 날씨, 공간의 분위기, 흘러나오는 음악 소리, 그리고 함께 있는 사람, 그 모든 것들이
        조화롭게 어우러지는 순간.  그럴 때 커피 한 잔이 우리의 감정을 담는 그릇이 되어특별한 의미를
        갖는 것 같아요. 풍류는 옛 선비들이 인격 수양을 위해 자연을 가까이 두고 멋스럽게 운치를
        즐기던 행위를 뜻합니다. 어느 학자는 이런 의미를 두고  멋스럽게
      </p>
    </div>
  );
};

export default LogProfile;
