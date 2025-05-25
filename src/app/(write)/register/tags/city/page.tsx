import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, TagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const CitySelectionPage = () => {
  return (
    <>
      <PageIntro title="도시를 선택해주세요." des="메인 도시를 선택해주세요." />
      <div className="grow">
        <TagGroup title="도시" type="city" />
      </div>
      <RegisterFooter tagTargets={['city']} nextPath={REGISTER_PATHS.SIGUNGU} />
    </>
  );
};

export default CitySelectionPage;
