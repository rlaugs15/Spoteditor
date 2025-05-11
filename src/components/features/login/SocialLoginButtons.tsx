import SocialLoginButton from './SocialLoginButton';

export default function SocialLoginButtons() {
  return (
    <section className="flex flex-col items-center w-full gap-2.5 py-10">
      <SocialLoginButton imgSrc="/login/google-login-button.png" alt="구글 로그인 버튼" />
      <SocialLoginButton imgSrc="/login/kakao-login-button.png" alt="카카오 로그인 버튼" />
    </section>
  );
}
