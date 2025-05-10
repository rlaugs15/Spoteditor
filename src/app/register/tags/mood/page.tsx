import { RegisterFooter } from '@/components/common/Footer';
import PageIntro from '@/components/features/register/tags/PageIntro';
import TagGroup from '@/components/features/register/tags/TagGroup';
import { REGISTER_PATHS } from '@/constants/pathname';

const MoodSelectionPage = () => {
  return (
    <>
      <PageIntro title="어떤 하루인가요?" des="여러개를 선택할 수 있어요" />
      <div className="grow">
        <TagGroup title="누구와" type="mood" />
        <TagGroup title="어떤 느낌으로" type="activity" />
      </div>
      <RegisterFooter nextPath={REGISTER_PATHS.COUNTRY} delayBtn />
    </>
  );
};

export default MoodSelectionPage;
