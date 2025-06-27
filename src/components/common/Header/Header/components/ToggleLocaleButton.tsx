'use client';

import { GlobeBlackIcon, GlobeIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function ToggleLocaleButton() {
  const pathname = usePathname();
  const locale = useLocale();
  const nextLocale = locale === 'ko' ? 'en' : 'ko';

  return (
    <Button variant={'ghost'} size={'icon'} asChild className="relative group">
      <Link href={{ pathname }} locale={nextLocale}>
        <GlobeIcon className="absolute group-hover:opacity-0" />
        <GlobeBlackIcon className="opacity-0 group-hover:opacity-100" />
      </Link>
    </Button>
  );
}
