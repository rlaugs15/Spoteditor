'use client';

import { SearchIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/stores/searchStore';

export default function SearchBarButton() {
  const toggleSearchBar = useSearchStore((state) => state.toggleSearchBar);
  return (
    <Button onClick={toggleSearchBar} variant={'ghost'} size={'icon'}>
      <SearchIcon />
    </Button>
  );
}
