import UserImage from '@/components/common/UserImage';

interface SimpleUserProfileProps {
  userImage: string;
}

export default function SimpleUserProfile({ userImage }: SimpleUserProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <UserImage imgSrc={userImage} className="w-6 h-6" />
      <span className="text-text-sm web:text-text-md font-semibold">알 수 없음</span>
    </div>
  );
}
