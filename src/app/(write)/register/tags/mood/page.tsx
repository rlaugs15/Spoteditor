import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, TagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const MoodSelectionPage = () => {
  return (
    <>
      <PageIntro type="mood" />
      <div className="grow">
        <TagGroup title="누구와" type="mood" />
        <TagGroup title="어떤 느낌으로" type="activity" />
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
