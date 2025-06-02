import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckedCircleIcon,
  CircleIcon,
  TrashIcon,
} from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface PlaceDrawerProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onDeletePlace: () => void;
  onMoveUpPlace: () => void;
  onMoveDownPlace: () => void;
}

const PlaceDrawer = ({
  isChecked,
  setIsChecked,
  onDeletePlace,
  onMoveUpPlace,
  onMoveDownPlace,
}: PlaceDrawerProps) => {
  return (
    <Drawer open={isChecked} onOpenChange={setIsChecked}>
      <DrawerTrigger>{isChecked ? <CheckedCircleIcon /> : <CircleIcon />}</DrawerTrigger>
      <DrawerContent className="bg-primary !border-0" overlayClassName="bg-transparent">
        <DrawerHeader hidden>
          <DrawerTitle>장소 상하 이동 및 삭제</DrawerTitle>
          <DrawerDescription>장소 상하 이동 및 삭제 Drawer</DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-3 gap-0 h-[80px]">
          <Button className="rounded-none h-full items-start pt-5" onClick={onMoveUpPlace}>
            <div className="flex items-center gap-2">
              <ArrowUpIcon className="w-4 h-4" /> 위로
            </div>
          </Button>
          <Button className="rounded-none h-full items-start pt-5" onClick={onMoveDownPlace}>
            <div className="flex items-center gap-2">
              <ArrowDownIcon className="w-4 h-4" /> 아래로
            </div>
          </Button>
          <Button className="rounded-none h-full items-start pt-5" onClick={onDeletePlace}>
            <div className="flex items-center gap-2">
              <TrashIcon className="w-4 h-4" /> 삭제
            </div>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PlaceDrawer;
