import BackButton from '../Button/BackButton';
import HomeLinkButton from './Header/HomeLinkButton';

const Header2 = () => {
  return (
    <header className="py-[15px] bg-white space-x-2">
      <BackButton plain />
      <HomeLinkButton />
    </header>
  );
};

export default Header2;
