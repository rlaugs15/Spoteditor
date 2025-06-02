import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, TagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const CountrySelectionPage = () => {
  return (
    <>
      <PageIntro title="국가를 선택해주세요." des="메인 국가를 선택해주세요." />
      <div className="grow">
        <TagGroup title="국가" type="country" />
      </div>
      <RegisterFooter tagTargets={['country']} nextPath={REGISTER_PATHS.CITY} />
    </>
  );
};

export default CountrySelectionPage;
