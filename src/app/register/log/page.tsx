import { Header3 } from '@/components/common/Header';
import PhotoTextForm from '@/components/features/register/log/PhotoTextForm';
import PlaceForm from '@/components/features/register/log/PlaceForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LogPage = () => {
  return (
    <div className="flex flex-col h-full">
      <Header3 />

      <main className="grow bg-white">
        <div className="mb-3">
          <Input
            type="text"
            placeholder="제목을 입력해주세요.(최대 30자)"
            className="!text-text-md mb-3"
            maxLength={30}
            minLength={1}
          />
          <PhotoTextForm cover />
        </div>

        {/* 장소들 */}
        <PlaceForm />
      </main>

      {/* footer */}
      <div className="text-text-sm w-full h-12 rounded-md flex items-center justify-center bg-error-50 text-red-500 my-2.5">
        부적절한 이미지 적발시 로그가 삭제될 수 있습니다.
      </div>
      <Button size={'xl'} className="font-bold w-full mt-2 mb-6">
        완료
      </Button>
    </div>
  );
};

export default LogPage;
