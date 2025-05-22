import MotionCard from '@/components/common/Card/MotionCard';
import { PostCard, PostCardWrapper } from '@/components/common/Card/PostCard';
import { TitledSection } from '@/components/common/SectionBlock';
import Carousel from '@/components/features/home/Carousel';
import Hero from '@/components/features/home/Hero';
import InfoBanners from '@/components/features/home/InfoBanner/InfoBanners';
import { mockLog } from '@/mocks/mockLog';

const MainPage = () => {
  return (
    <div className="h-full">
      <Hero />

      <div className="pt-[60px] pb-[140px] px-4 web:px-[50px] space-y-20">
        <TitledSection title="Latest" subTitle="Log">
          <Carousel />
        </TitledSection>

        <InfoBanners />

        <TitledSection title="Latest" subTitle="Log">
          <PostCardWrapper className="mb-[50px]">
            {Array.from({ length: 10 }).map((card, idx) => (
              <MotionCard key={idx}>
                <PostCard log={mockLog} />
              </MotionCard>
            ))}
          </PostCardWrapper>
        </TitledSection>
      </div>
    </div>
  );
};

export default MainPage;
