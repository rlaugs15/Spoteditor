'use client';

import { Button } from '@/components/ui/button';

interface CitySearchButtonProps {
  city: string;
  onClick: (sido: string) => void;
}

export default function CitySearchButton({ city, onClick }: CitySearchButtonProps) {
  return (
    <Button
      type="button"
      onClick={() => onClick(city)}
      className="px-2.5 py-[15px] w-full web:w-[145px] h-12 text-light-300 bg-light-50 hover:bg-light-100"
    >
      {city}
    </Button>
  );
}
