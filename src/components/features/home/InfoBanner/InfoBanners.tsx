import { ArrowUpRightIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import InfoBanner from './InfoBanner';
import TypingText from './TypingText';

const InfoBanners = async () => {
  const t = await getTranslations('HomePage');
  return (
    <div className="grid grid-rows-2 web:grid-rows-1 web:grid-cols-2 web:gap-[30px]">
      <InfoBanner>
        <TypingText />
        <div className="flex items-center">
          <Button
            className="rounded-full !text-text-sm web:!text-text-md font-medium text-white"
            size={'lg'}
            asChild
          >
            <Link href={REGISTER_PATHS.MOOD}>{t('registerCourse')}</Link>
          </Button>
          <Button className="rounded-full" size={'icon'} asChild>
            <Link href={REGISTER_PATHS.MOOD}>
              <ArrowUpRightIcon />
            </Link>
          </Button>
        </div>
      </InfoBanner>
      <InfoBanner className="border-t-0 web:border-t">
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
