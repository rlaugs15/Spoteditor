import XButton from '@/components/common/Button/XButton';
import { ModalContent, ModalHeader } from '@/components/common/Modal';
import SocialLoginButtons from '@/components/features/login/SocialLoginButtons';
import { PRIVACY_PATHS, TERMS_PATHS } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function LoginModal() {
  const t = await getTranslations('LoginModal');
  const description = t('description').split('\n');
  return (
    <ModalContent>
      <ModalHeader>
        <XButton />
      </ModalHeader>
      <section className="flex flex-col text-center items-center self-stretch">
        <h1 className="font-prompt text-3xl font-bold mb-10">Spoteditor</h1>
        <h2 className="font-bold text-lg web:text-xl mb-3">{t('login')}</h2>
        <p className="text-center text-text-sm text-light-700">
          {' '}
          {description.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </section>
      <SocialLoginButtons />
      <p className="font-pretendard text-light-300 text-center text-text-2xs web:text-text-xs">
        {t('agreementNotice.beforeLinks')}{' '}
        <Link href={PRIVACY_PATHS.PRIVACY} className="border-b border-light-300 pb-[0.5px]">
          {t('privacyPolicy')}
        </Link>{' '}
        {t('agreementNotice.middle')}{' '}
        <Link href={TERMS_PATHS.TERMS} className="border-b border-light-300 pb-[0.5px]">
          {t('termsOfService')}
        </Link>
        {t('agreementNotice.afterLinks')}
        <br />
        {t('dataCollection')}
      </p>
    </ModalContent>
  );
}
