import CitySearchForm from './CitySearchForm/CitySearchForm';

const Hero = () => {
  return (
    <div className="bg-black px-4 web:px-[50px] py-[30px] web:py-10 flex flex-col web:grid web:grid-cols-2 justify-between gap-[25px]">
      <div className="flex text-white text-md font-medium web:text-[34px] items-center leading-[1.3] shrink-0 tracking-tight">
        어디 갈지 고민될 땐?
        <br />
        감각있는 스팟 큐레이터들이 직접 만든
        <br />
        코스를 만나보세요!
      </div>
      <div className="flex flex-col justify-center gap-[25px]">
        <CitySearchForm />
        {/* <HeroCategoryList /> */}
      </div>
    </div>
  );
};

export default Hero;
