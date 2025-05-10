import Hero from '@/components/features/home/Hero';
import Login from '@/components/test/Login';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import Link from 'next/link';

const MainPage = () => {
  return (
    <div className="h-full">
      <Hero />
      <Login />
      <Button asChild>
        <Link href={REGISTER_PATHS.MOOD}>등록 페이지로</Link>
      </Button>
    </div>
  );
};

export default MainPage;
