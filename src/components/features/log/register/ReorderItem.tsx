import { Grip } from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';
import PlaceImage from '../common/PlaceImage';

interface ReorderItemProps {
  item: Record<'id', string>;
  imageUrl: string;
  onDeleteClick: () => void;
  imageIdx: number;
}

const ReorderItem = ({ item, imageUrl, onDeleteClick, imageIdx }: ReorderItemProps) => {
  const controls = useDragControls();

  return (
    <>
      <Reorder.Item
        key={item.id}
        value={item}
        className="relative w-[220px] h-[300px] shrink-0 cursor-default"
        whileDrag={{
          scale: 1.05,
          zIndex: 100,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
        }}
        dragListener={false}
        dragControls={controls}
        style={{
          touchAction: 'pan-x',
          userSelect: 'none',
        }}
      >
        <PlaceImage imageUrl={imageUrl} onDeleteClick={onDeleteClick} imageIdx={imageIdx} />
        <div
          className="absolute bottom-2 right-2 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => controls.start(e)}
        >
          <Grip color="white" />
        </div>
      </Reorder.Item>
    </>
  );
};

export default ReorderItem;
