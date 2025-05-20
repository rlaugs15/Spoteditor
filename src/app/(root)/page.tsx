import { TitledSection } from '@/components/common/SectionBlock';
import Hero from '@/components/features/home/Hero';
import InfoBanner from '@/components/features/home/InfoBanner/InfoBanner';
import Login from '@/components/test/Login';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
const MainPage = () => {
  return (
    <div className="h-full">
      <Hero />
      <Login />
      <Button asChild>
        <Link href={REGISTER_PATHS.MOOD}>등록 페이지로</Link>
      </Button>

      <div className="pt-[60px] pb-[140px] px-[50px]">
        <TitledSection title="Sort by" subTitle="Popularity">
          카드
        </TitledSection>
        <div className="grid grid-cols-2 gap-[30px]">
          <InfoBanner>
            <p className="font-bold text-xl text-black">
              모든 유저가 특별한 “에디터"가 될 수 있어요!
            </p>
            <div className="flex items-center">
              <Button className="rounded-full !text-text-md font-medium text-white" size={'lg'}>
                나의 추천 코스 등록하기
              </Button>
              <Button className="rounded-full" size={'icon'}>
                <ArrowUpRightIcon />
              </Button>
            </div>
          </InfoBanner>
          <InfoBanner>
            <p className="px-5">
              내가 좋아하는 숨은 명소와 맛집을 공유하고, 다른 유저들이 여러분의 루트를 참고하며
              "내가 만든 코스로 누군가 즐거운 하루를 보냈구나!" 하는 느낌, 상상만 해도 행복하지
              않나요? 🥰
              <br />
              다른 유저들이 참고할 수 있도록 여러분만의 코스를 나눠보세요.
              <br />
              여러분이 만들어준 코스는 많은 사람들에게 새로운 영감을 줄 거예요!
            </p>
          </InfoBanner>
        </div>
        <TitledSection title="Latest" subTitle="Log">
          카드
        </TitledSection>
      </div>
    </div>
  );
};

export default MainPage;
