import {
  ArrowLeftIcon,
  PenBlackIcon,
  PenIcon,
  ShareIcon,
  TableIcon,
  WhiteLocationIcon,
} from '@/components/common/Icons';
import ExtraActionButton from '@/components/features/detail-log/ExtraActionButton';
import LogContent from '@/components/features/detail-log/LogContent';
import LogProfile from '@/components/features/detail-log/LogProfile';
import { Badge } from '@/components/ui/badge';

const LogDetailPage = () => {
  return (
    <div>
      <section className="bg-pink-200 h-[488px] flex flex-col justify-between px-4 web:pl-[50px] pt-4 pb-8">
        <div className="flex justify-between">
          <ExtraActionButton>
            <ArrowLeftIcon />
          </ExtraActionButton>
          <div className="flex flex-col gap-2">
            <ExtraActionButton>
              <ShareIcon />
            </ExtraActionButton>
            <ExtraActionButton>
              <PenIcon />
            </ExtraActionButton>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg web:text-2xl font-bold text-white">
            혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
          </h3>
          <div className="flex gap-1">
            <Badge className="bg-white/30 px-4 py-1.5 rounded-full">태그</Badge>
            <Badge className="bg-white/30 px-4 py-1.5 rounded-full">
              <WhiteLocationIcon />3
            </Badge>
          </div>
        </div>
      </section>
      <main className="flex flex-col px-4 web:px-[50px]">
        <LogProfile />
        <div>
          <LogContent />
          <LogContent />
        </div>
      </main>
      <div className="flex flex-col gap-2 fixed z-10 bottom-10 right-4">
        <ExtraActionButton className="bg-white w-11 h-11">
          <PenBlackIcon />
        </ExtraActionButton>
        <ExtraActionButton className="bg-white w-11 h-11">
          <TableIcon />
        </ExtraActionButton>
      </div>
    </div>
  );
};

export default LogDetailPage;
