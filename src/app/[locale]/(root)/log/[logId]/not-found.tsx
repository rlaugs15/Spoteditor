import ErrorTemplate from '@/components/common/ErrorTemplate';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFoundPage');
  return <ErrorTemplate message={t('logMessage')} />;
}
