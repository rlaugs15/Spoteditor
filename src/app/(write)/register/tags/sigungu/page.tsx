import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, TagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const SigunguSelectionPage = () => {
  return (
    <>
      <PageIntro type="sigungu" />
      <div className="grow">
        <TagGroup type="sigungu" />
      </div>
      <RegisterFooter tagTargets={['sigungu']} nextPath={REGISTER_PATHS.LOG} />
    </>
  );
};

export default SigunguSelectionPage;
