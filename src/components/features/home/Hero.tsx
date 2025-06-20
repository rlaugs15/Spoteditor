import { getTranslations } from 'next-intl/server';
import CitySearchForm from './CitySearchForm/CitySearchForm';

const Hero = async () => {
  const t = await getTranslations('HomePage');
  return (
    <div className="bg-black px-4 web:px-[50px] py-[30px] web:py-10 flex flex-col web:grid web:grid-cols-2 justify-between gap-[25px]">
      <div className="flex text-white text-md font-medium web:text-[34px] items-center leading-[1.3] shrink-0 tracking-tight">
        {t('title1')}
        <br />
        {t('title2')}
        <br />
        {t('title3')}
      </div>
      <div className="flex flex-col justify-center gap-[25px]">
        <CitySearchForm />
        {/* <HeroCategoryList /> */}
      </div>
    </div>
  );
};

export default Hero;
