import { HOME } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';

const Logo = () => {
  return (
    <Link href={HOME} className="text-white text-[23px] font-prompt">
      Spoteditor
    </Link>
  );
};

export default Logo;
