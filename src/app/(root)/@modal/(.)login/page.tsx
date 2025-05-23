import XButton from '@/components/common/Button/XButton';
import { ModalContent, ModalHeader } from '@/components/common/Modal';
import SocialLoginButtons from '@/components/features/login/SocialLoginButtons';

export default function LoginModal() {
  return (
    <ModalContent>
      <ModalHeader>
        <XButton />
      </ModalHeader>
      <section className="flex flex-col text-center items-center gap-6 self-stretch">
        <h1 className="font-prompt text-3xl font-bold">Spoteditor</h1>
        <h3 className="font-bold text-2xl">로그인</h3>
        <p className="leading-[20.15px] text-center text-text-sm text-light-700">
          지금 로그인 하시고 매일 새로운 Spoteditor의
          <br /> 업데이트 소식을 확인해보세요.
        </p>
      </section>
      <SocialLoginButtons />
    </ModalContent>
  );
}
