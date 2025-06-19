import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, SingleTagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const CitySelectionPage = () => {
  return (
    <>
      <PageIntro type="city" />
      <div className="grow">
        <SingleTagGroup type="city" nextPath={REGISTER_PATHS.SIGUNGU} />
      </div>
      <RegisterFooter tagTargets={['city']} nextPath={REGISTER_PATHS.SIGUNGU} />
    </>
  );
};

export default CitySelectionPage;
