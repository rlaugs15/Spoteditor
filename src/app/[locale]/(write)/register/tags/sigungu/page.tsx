import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, SingleTagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const SigunguSelectionPage = () => {
  return (
    <>
      <PageIntro type="sigungu" />
      <div className="grow">
        <SingleTagGroup type="sigungu" nextPath={REGISTER_PATHS.LOG} />
      </div>
      <RegisterFooter tagTargets={['sigungu']} nextPath={REGISTER_PATHS.LOG} />
    </>
  );
};

export default SigunguSelectionPage;
