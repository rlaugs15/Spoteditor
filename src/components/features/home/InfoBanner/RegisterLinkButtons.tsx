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
        className="rounded-full w-56 h-15 !text-text-sm web:!text-text-md font-medium bg-white text-black"
        size="lg"
        asChild
      >
        <Link href={REGISTER_PATHS.MOOD}>{label}</Link>
      </Button>
      <Button className="rounded-full w-15 h-15 bg-white" size="icon" asChild>
        <Link href={REGISTER_PATHS.MOOD}>
          <ArrowUpRightIcon className="w-9 h-9" />
        </Link>
      </Button>
    </div>
  );
}
