import XButton from '@/components/common/Button/XButton';
import { ModalContent, ModalHeader } from '@/components/common/Modal';
import SocialLoginButtons from '@/components/features/login/SocialLoginButtons';
import { PRIVACY_PATHS, TERMS_PATHS } from '@/constants/pathname';
import Link from 'next/link';

export default function LoginModal() {
  return (
    <ModalContent>
      <ModalHeader>
        <XButton />
      </ModalHeader>
      <section className="flex flex-col text-center items-center self-stretch">
        <h1 className="font-prompt text-3xl font-bold mb-10">Spoteditor</h1>
        <h2 className="font-bold text-lg web:text-xl mb-3">로그인</h2>
        <p className="text-center text-text-sm text-light-700">
          지금 로그인 하시고 매일 새로운 Spoteditor의
          <br /> 업데이트 소식을 확인해보세요.
        </p>
      </section>
      <SocialLoginButtons />
      <p className="font-pretendard text-light-300 text-center text-text-2xs web:text-text-xs">
        로그인은{' '}
        <Link href={PRIVACY_PATHS.PRIVACY} className="border-b border-light-300 pb-[0.5px]">
          개인정보보호정책
        </Link>{' '}
        및{' '}
        <Link href={TERMS_PATHS.TERMS} className="border-b border-light-300 pb-[0.5px]">
          서비스약관
        </Link>
        에 동의하는 것을 의미하며, <br />
        서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
      </p>
    </ModalContent>
  );
}
