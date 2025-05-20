import mock from '@/app/assets/mockImg.png';
import MotionCard from '@/components/common/Card/MotionCard';
import {
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/components/common/Card/PostCard';
import { TitledSection } from '@/components/common/SectionBlock';
import Hero from '@/components/features/home/Hero';
import InfoBanners from '@/components/features/home/InfoBanner/InfoBanners';
const MainPage = () => {
  return (
    <div className="h-full">
      <Hero />

      <div className="pt-[60px] pb-[140px] px-4 web:px-[50px] space-y-20">
        <TitledSection title="Latest" subTitle="Log">
          <PostCardWrapper className="mb-[50px]">
            {[1, 2, 3, 4].map((card) => (
              <div key={card}>
                <PostCardImage lable author="" imageUrl={mock.src} />
                <PostCardTitle title={'ㅎㅎ'} />
                <PostCardLocation city="서울" sigungu="ㅎㅎ" />
              </div>
            ))}
          </PostCardWrapper>
        </TitledSection>

        <InfoBanners />

        <TitledSection title="Latest" subTitle="Log">
          <PostCardWrapper className="mb-[50px]">
            {Array.from({ length: 10 }).map((card, idx) => (
              <MotionCard key={idx}>
                <PostCardImage lable author="작성자" imageUrl={mock.src} />
                <PostCardTitle title="로그제목" />
                <PostCardLocation city="서울" sigungu="시군구" />
              </MotionCard>
            ))}
          </PostCardWrapper>
        </TitledSection>
      </div>
    </div>
  );
};

export default MainPage;
