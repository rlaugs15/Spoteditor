'use client';
import { getTranslations } from 'next-intl/server';
import InfoBanner from './InfoBanner';
import RegisterLinkButtons from './RegisterLinkButtons';
import TypingText from './TypingText';

const InfoBanners = async () => {
  const t = await getTranslations('HomePage');
  return (
    <div className="grid grid-rows-[1.8fr_1.1fr] web:grid-rows-1 web:grid-cols-2 web:gap-[30px] bg-white text-black px-4 web:px-[50px] h-[370px] web:h-[260px]">
      {/* 왼쪽 영역 - 하단 보더 */}
      <div className="border-b border-light-100">
        <InfoBanner>
          <div className="flex flex-col justify-between h-full">
            <TypingText />
            <RegisterLinkButtons label={t('registerCourse')} />
          </div>
        </InfoBanner>
      </div>

      {/* 오른쪽 영역 - 하단 보더 */}
      <div className="border-b border-light-100">
        <InfoBanner>
          <p className="web:px-5">
            {t('registerCourseDescription.line1')}
            <br />
            {t('registerCourseDescription.line2')}
            <br />
            {t('registerCourseDescription.line3')}
            <br />
            {t('registerCourseDescription.line4')}
            {/* <br />
            {t('registerCourseDescription.line5')} */}
          </p>
        </InfoBanner>
      </div>
    </div>
  );
};

export default InfoBanners;
