import { getTranslations } from 'next-intl/server';
import InfoBanner from './InfoBanner';
import RegisterLinkButtons from './RegisterLinkButtons';
import TypingText from './TypingText';

const InfoBanners = async () => {
  const t = await getTranslations('HomePage');
  return (
    <div className="grid grid-rows-2 web:grid-rows-1 web:grid-cols-2 web:gap-[30px] bg-black text-white px-4 web:px-[50px]">
      <InfoBanner>
        <TypingText />
        <RegisterLinkButtons label={t('registerCourse')} />
      </InfoBanner>
      <InfoBanner>
        <p className="web:px-5">
          {t('registerCourseDescription.line1')}
          <br />
          {t('registerCourseDescription.line2')}
          <br />
          {t('registerCourseDescription.line3')}
          <br />
          {t('registerCourseDescription.line4')}
          <br />
          {t('registerCourseDescription.line5')}
        </p>
      </InfoBanner>
    </div>
  );
};

export default InfoBanners;
