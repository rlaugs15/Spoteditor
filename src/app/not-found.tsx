import ErrorTemplate from '@/components/common/ErrorTemplate';
import Header from '@/components/common/Header';

const NotFoundPage = () => {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <ErrorTemplate />
    </div>
  );
};

export default NotFoundPage;
