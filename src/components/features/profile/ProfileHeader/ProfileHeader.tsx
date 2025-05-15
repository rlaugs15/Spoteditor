import { Separator } from '@/components/ui/separator';
import { PublicUser, IUser } from '@/types/api/user';
import FollowButtons from './components/FollowButtons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import UserImage from '@/components/common/UserImage';

interface ProfileHeaderProps {
  me: IUser;
  user: PublicUser;
}

export default function ProfileHeader({ me, user }: ProfileHeaderProps) {
  return (
    <section className="flex flex-col items-center justify-start w-full pb-5 web:pb-[30px]">
      <section>
        <UserImage imgSrc={String(user?.image_url)} />
      </section>
      <section className="gap-[6px] flex justify-center items-center my-3">
        {/* VerifiedLabelIcon 도입 시 h2 태그에 pl-3 추가 */}
        <h2 className="font-bold text-md web:text-xl">{user?.nickname}</h2>
        {/* <VerifiedLabelIcon className="w-[16.075px] h-[15.921px] web:w-[22px] web:h-[21px]" /> */}
      </section>
      <section className="flex gap-[15px] py-1 text-text-lg web:text-text-2xl">
      </section>
      <section className="flex my-[7px] flex-col gap-[10px] web:gap-[15px] items-center text-light-300 font-medium text-center text-text-xs web:text-text-sm">
    </section>
  );
}
