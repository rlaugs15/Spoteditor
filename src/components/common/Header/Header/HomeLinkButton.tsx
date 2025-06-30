'use client';

import { HomeIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';

export default function HomeLinkButton() {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={HOME}>
        <HomeIcon />
      </Link>
    </Button>
  );
}
