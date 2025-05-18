interface ProfileFallbackMessageProps {
  resourceName: string;
}

export default function ProfileFallbackMessage({ resourceName }: ProfileFallbackMessageProps) {
  return (
    <div className="flex justify-center items-start py-[49px] min-h-[350px]">
      <h3 className="font-bold text-center text-text-sm text-primary-200">
        저장된 {resourceName}가 없습니다.
        <br /> 로그를 둘러본뒤 관심있는 장소를 저장해보세요!
      </h3>
    </div>
  );
}
