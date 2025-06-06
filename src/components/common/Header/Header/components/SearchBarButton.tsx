'use client';

import { SearchBlackIcon, SearchIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/stores/searchStore';

export default function SearchBarButton() {
  const toggleSearchBar = useSearchStore((state) => state.toggleSearchBar);
  return (
    <Button onClick={toggleSearchBar} variant={'ghost'} size={'icon'} className="relative group">
      <SearchIcon className="absolute group-hover:opacity-0" />
      <SearchBlackIcon className="opacity-0 group-hover:opacity-100" />
    </Button>
  );
}
