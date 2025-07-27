import { userKeys } from '@/app/actions/keys';
import { globalTags } from '@/app/actions/tags';
import ErrorTemplate from '@/components/common/ErrorTemplate';
import { getTranslations } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

export default async function NotFound() {
  revalidatePath(globalTags.userAll);
  const t = await getTranslations('NotFoundPage');
  return <ErrorTemplate message={t('userMessage')} invalidateKeys={[userKeys.all[0]]} />;
}
