import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ logId: string }>;
}

export default async function Page({ params }: Props) {
  const { logId } = await params;
  const locale = await getLocale();
  redirect({
    href: `/log/${logId}`,
    locale,
  });
}
