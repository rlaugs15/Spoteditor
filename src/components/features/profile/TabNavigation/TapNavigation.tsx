'user client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IUser } from '@/types/api/user';
import TabNavButton from './TabNavButton';

interface TapNavigationProps {
  me: IUser;
  userId: string;
}

export default function TapNavigation({ me, userId }: TapNavigationProps) {
  /*  const touter = useRouter();
  const handleGotoRegisterPage = () =>
    touter(REGISTER_SELECT, {
      state: { from: location.pathname },
    }); */
  return (
    <nav className="w-full flex justify-center web:justify-start items-center gap-[21px] web:gap-[30px] mb-5 web:mb-7.5">
      <TabNavButton tabKey="my-logs" userId={userId} tabName="나의 로그" />
      <TabNavButton tabKey="saved-spaces" userId={userId} tabName="저장된 공간" />
      <TabNavButton tabKey="saved-logs" userId={userId} tabName="저장된 로그" />
      {me && (
        <>
          <div>
            <Separator orientation="vertical" className="h-4.5 web:h-5" />
          </div>
          {userId === me?.user_id && (
            <Button
              size="s"
              className="rounded-[60px] px-4 py-[11px] h-7 web:h-9 web:text-text-sm font-untitled text-white"
              //onClick={handleGotoRegisterPage}
            >
              Upload
            </Button>
          )}
        </>
      )}
    </nav>
  );
}
