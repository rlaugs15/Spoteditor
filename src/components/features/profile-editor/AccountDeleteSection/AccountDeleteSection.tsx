'use client';

import { useTranslations } from 'next-intl';
import AccountDeleteDialog from './AccountDeleteDialog';

export default function AccountDeleteSection() {
  const t = useTranslations('ProfileEditor.account');
  return (
    <section className="mt-10">
      <p className="mb-4 font-bold text-text-md web:text-text-2xl">{t('title')}</p>
      <div className="flex items-center justify-between py-[5px]">
        <p className="font-bold text-text-sm">{t('label')}</p>
        <AccountDeleteDialog />
      </div>
      <p className="font-medium text-light-300 text-text-xs">
        {t('description')
          .split('\n')
          .map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
      </p>
    </section>
  );
}
