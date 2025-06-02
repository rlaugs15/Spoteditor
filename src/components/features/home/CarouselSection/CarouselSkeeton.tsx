import { Skeleton } from '@/components/ui/skeleton';

export default function CarouselSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden px-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col w-full">
          <Skeleton className="w-full aspect-[324/425] mb-2" />
          <Skeleton className="w-3/4 h-4 mb-1" />
          <Skeleton className="w-1/2 h-3" />
        </div>
      ))}
    </div>
  );
}
