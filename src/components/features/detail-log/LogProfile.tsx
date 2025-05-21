import { Button } from '@/components/ui/button';

interface LogProfileProps {
  userId: string;
}

const LogProfile = ({ userId }: LogProfileProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-red-300 w-6 h-6 rounded-full" />
      <span className="text-text-sm web:text-text-md font-semibold">userId</span>
      <Button size={'sm'} variant={'outline'} className="rounded-full">
        팔로우
      </Button>
    </div>
  );
};

export default LogProfile;
