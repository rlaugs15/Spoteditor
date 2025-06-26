import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro } from '@/components/features/log/register/tags';
import MultiTagGroup from '@/components/features/log/register/tags/MultiTagGroup';
import { REGISTER_PATHS } from '@/constants/pathname';
import { getTranslations } from 'next-intl/server';

const MoodSelectionPage = async () => {
  const t = await getTranslations('Register.MoodPage.group');
  return (
    <>
      <PageIntro type="mood" />
      <div className="grow">
        <MultiTagGroup title={t('withWhom')} type="mood" />
        <MultiTagGroup title={t('whatFeeling')} type="activity" />
      </div>
      <RegisterFooter
        tagTargets={['mood', 'activity']}
        nextPath={REGISTER_PATHS.COUNTRY}
        delayBtn
      />
    </>
  );
};

export default MoodSelectionPage;
