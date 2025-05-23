import XButton from '@/components/common/Button/XButton';
import { PostCard } from '@/components/common/Card/PostCard';
import { ModalContent, ModalHeader } from '@/components/common/Modal';
import { mockLog } from '@/mocks/mockLog';

export default function PlaceCollect() {
  return (
    <ModalContent>
      <ModalHeader className="justify-between px-0">
        <h3 className="font-bold text-text-2xl">소개된 장소</h3>
        <XButton />
      </ModalHeader>
      <section className="grid grid-cols-3 w-full gap-x-[5px] gap-y-5 overflow-y-auto max-h-[600px] scrollbar-hide">
        {Array.from({ length: 8 }).map((log, idx) => (
          <PostCard key={idx} vertical log={mockLog} modal />
        ))}
      </section>
    </ModalContent>
  );
}
