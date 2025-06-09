import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, TagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const CitySelectionPage = () => {
  return (
    <>
      <PageIntro type="city" />
      <div className="grow">
        <TagGroup type="city" />
      </div>
      <RegisterFooter tagTargets={['city']} nextPath={REGISTER_PATHS.SIGUNGU} />
    </>
  );
};

export default CitySelectionPage;
