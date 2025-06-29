'use client';

import { ArrowUpRightIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';

interface RegisterLinkButtonsProps {
  label: string;
}

export default function RegisterLinkButtons({ label }: RegisterLinkButtonsProps) {
  return (
    <div className="flex items-center">
      <Button
        className="rounded-full !text-text-sm web:!text-text-md font-medium text-white"
        size="lg"
        asChild
      >
        <Link href={REGISTER_PATHS.MOOD}>{label}</Link>
      </Button>
      <Button className="rounded-full" size="icon" asChild>
        <Link href={REGISTER_PATHS.MOOD}>
          <ArrowUpRightIcon />
        </Link>
      </Button>
    </div>
  );
}
