import { getLocale } from 'next-intl/server';
import Link from 'next/link';

const Logo = async () => {
  const locale = await getLocale();
  return (
    <Link href={`/${locale}`} className="text-white text-[23px] font-prompt">
      Spoteditor
    </Link>
  );
};

export default Logo;
