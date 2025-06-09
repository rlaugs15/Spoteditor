import { PRIVACY_PATHS, TERMS_PATHS } from '@/constants/pathname';
import Link from 'next/link';
import ContactLink from './ContactLink';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 bg-black text-text-sm web:text-text-md px-4 web:px-[50px] pt-[100px] web:pt-[200px] pb-10">
      <ContactLink />

      <div className="flex flex-col web:flex-row gap-3 justify-between text-light-600">
        <p>©2025 Spoteditor. All Rights are reserved️</p>
        <div className="flex gap-6">
          <Link href={PRIVACY_PATHS.PRIVACY}>Privacy Policy</Link>
          <Link href={TERMS_PATHS.TERMS}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
