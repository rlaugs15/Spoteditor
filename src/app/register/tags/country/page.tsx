import { RegisterFooter } from '@/components/common/Footer';
import PageIntro from '@/components/features/register/tags/PageIntro';
import TagGroup from '@/components/features/register/tags/TagGroup';
import { REGISTER_PATHS } from '@/constants/pathname';

const CountrySelectionPage = () => {
  return (
    <div className="h-full flex flex-col">
      <PageIntro title="국가를 선택해주세요." des="메인 국가를 선택해주세요." />
      <div className="grow">
        <TagGroup title="국가" type="country" />
      </div>
      <RegisterFooter nextPath={REGISTER_PATHS.CITY} />
    </div>
  );
};

export default CountrySelectionPage;
