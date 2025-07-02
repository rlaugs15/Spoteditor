'use client';

import { PRIVACY_PATHS, TERMS_PATHS } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function LoginAgreementNotice() {
  const t = useTranslations('LoginModal');

  return (
    <p className="font-pretendard text-light-300 text-center text-text-2xs web:text-text-xs">
      {t('agreementNotice.beforeLinks')}{' '}
      <Link href={PRIVACY_PATHS.PRIVACY} className="border-b border-light-300 pb-[0.5px]">
        {t('privacyPolicy')}
      </Link>
      {t('agreementNotice.middle')}{' '}
      <Link href={TERMS_PATHS.TERMS} className="border-b border-light-300 pb-[0.5px]">
        {t('termsOfService')}
      </Link>
      {t('agreementNotice.afterLinks')}
      <br />
      {t('dataCollection')}
    </p>
  );
}
