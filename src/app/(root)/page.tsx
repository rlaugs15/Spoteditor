import { TitledSection } from '@/components/common/SectionBlock';
import Carousel from '@/components/features/home/Carousel';
import Hero from '@/components/features/home/Hero';
import InfoBanners from '@/components/features/home/InfoBanner/InfoBanners';
import LatestLogConentSection from '@/components/features/home/LatestLogConentSection/LatestLogConentSection';

interface MainPageProps {
  searchParams: Promise<{ logPage: string }>;
}

const MainPage = async ({ searchParams }: MainPageProps) => {
  const { logPage } = await searchParams;
  /* 참고: logPage는 URL 쿼리스트링에서 파싱되기 때문에 타입은 string이지만 값이 항상 보장되진 않음
  예: logPage=NaN, logPage=abc, logPage= 등 → Number() 처리 후 NaN으로 바뀜 */
  const parsedPage = Number(logPage);
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  return (
    <div className="h-full">
      <Hero />

      <div className="pt-[60px] pb-[140px] px-4 web:px-[50px] space-y-20">
        <TitledSection title="Latest" subTitle="Log">
          <Carousel />
        </TitledSection>
        <InfoBanners />
        <LatestLogConentSection currentPage={currentPage} />
      </div>
    </div>
  );
};

export default MainPage;
