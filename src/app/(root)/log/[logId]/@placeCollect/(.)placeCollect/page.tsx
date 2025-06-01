import { LogIdParams } from '@/app/(root)/log/[logId]/page';
import { fetchLog } from '@/app/actions/log';
import XButton from '@/components/common/Button/XButton';
import PlaceCard from '@/components/common/Card/PlaceCard.tsx/PlaceCard';
import { ModalContent, ModalHeader } from '@/components/common/Modal';
import { PlaceWithImages } from '@/types/api/log';
interface PlaceCollectProps {
  params: LogIdParams;
}
export default async function PlaceCollect({ params }: PlaceCollectProps) {
  const { logId } = await params;
  const result = await fetchLog(logId);
  if(!result.success) {
    return null
  }
   const { place: places } = result.data; 
  return (
    <ModalContent>
      <ModalHeader className="justify-between px-0">
        <h3 className="font-bold text-text-2xl">소개된 장소</h3>
        <XButton />
      </ModalHeader>
      <section className="grid grid-cols-3 w-full gap-x-[5px] gap-y-5 overflow-y-auto max-h-[600px] scrollbar-hide">
        {places.map((place: PlaceWithImages, idx: number) => (
          <PlaceCard key={idx} place={place} vertical modal />
        ))}
      </section>
    </ModalContent>
  );
}
