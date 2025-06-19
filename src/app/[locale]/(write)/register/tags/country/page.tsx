import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, SingleTagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const CountrySelectionPage = () => {
  return (
    <>
      <PageIntro type="country" />
      <div className="grow">
        <SingleTagGroup title="국가" type="country" nextPath={REGISTER_PATHS.CITY} />
      </div>
      <RegisterFooter tagTargets={['country']} nextPath={REGISTER_PATHS.CITY} />
    </>
  );
};

export default CountrySelectionPage;
