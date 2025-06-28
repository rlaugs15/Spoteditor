import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

export default async function LoginPage() {
  const locale = await getLocale();
  redirect({
    href: '/',
    locale,
  });
}
