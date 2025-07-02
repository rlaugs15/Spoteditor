'use client';

import { PRIVACY_PATHS, TERMS_PATHS } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';

export default function FooterPolicyLinks() {
  return (
    <div className="flex gap-6">
      <Link href={PRIVACY_PATHS.PRIVACY}>Privacy Policy</Link>
      <Link href={TERMS_PATHS.TERMS}>Terms & Conditions</Link>
    </div>
  );
}
