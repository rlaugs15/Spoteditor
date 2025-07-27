import { logKeys, placeKeys } from '@/app/actions/keys';
import { globalTags } from '@/app/actions/tags';
import ErrorTemplate from '@/components/common/ErrorTemplate';
import { getTranslations } from 'next-intl/server';
import { revalidateTag } from 'next/cache';

export default async function NotFound() {
  revalidateTag(globalTags.logAll);
  revalidateTag(globalTags.placeAll);
  const t = await getTranslations('NotFoundPage');
  return (
    <ErrorTemplate message={t('logMessage')} invalidateKeys={[logKeys.all[0], placeKeys.all[0]]} />
  );
}
