import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, SingleTagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';
import { getTranslations } from 'next-intl/server';

const CountrySelectionPage = async () => {
  const t = await getTranslations('Register.CountryPage');
  return (
    <>
      <PageIntro type="country" />
      <div className="grow">
        <SingleTagGroup title={t('groupTitle')} type="country" nextPath={REGISTER_PATHS.CITY} />
      </div>
      <RegisterFooter tagTargets={['country']} nextPath={REGISTER_PATHS.CITY} />
    </>
  );
};

export default CountrySelectionPage;
