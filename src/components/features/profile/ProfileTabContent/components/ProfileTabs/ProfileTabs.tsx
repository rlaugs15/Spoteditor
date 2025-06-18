'user client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { REGISTER_PATHS } from '@/constants/pathname';
import { useProfileTabStore } from '@/stores/profileStore';
import { IUser } from '@/types/api/user';
import { useRouter } from 'next/navigation';
import TabButton from './TabButton';

interface ProfileTabsProps {
  me: IUser;
  userId: string;
}

export default function ProfileTabs({ me, userId }: ProfileTabsProps) {
  const { tab, setTab } = useProfileTabStore();
  const router = useRouter();
  const handleGotoRegisterPage = () => router.push(`${REGISTER_PATHS.MOOD}`);
  const onTabClick = (tab: 'myLog' | 'savedSpaces' | 'savedLog') => {
    setTab(tab);
  };
  return (
    <nav className="w-full flex justify-center web:justify-start items-center gap-[21px] web:gap-7.5 mb-5 web:mb-7.5">
      <TabButton
        tabKey="myLog"
        userId={userId}
        tabName="나의 로그"
        tab={tab}
        onTabClick={onTabClick}
      />
      <TabButton
        tabKey="savedSpaces"
        userId={userId}
        tabName="저장된 장소"
        tab={tab}
        onTabClick={onTabClick}
      />
      <TabButton
        tabKey="savedLog"
        userId={userId}
        tabName="저장된 로그"
        tab={tab}
        onTabClick={onTabClick}
      />
      {userId === me?.user_id && (
        <>
          <div className="flex items-center h-5">
            <Separator orientation="vertical" className="h-4.5 web:h-5" />
          </div>
          <Button
            size="s"
            className="rounded-[60px] px-4 pt-[11px] pb-[13px] h-7 web:h-9 web:text-text-sm font-untitled text-white"
            onClick={handleGotoRegisterPage}
          >
            Upload
          </Button>
        </>
      )}
    </nav>
  );
}
