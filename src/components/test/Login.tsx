import { login, logout } from '@/app/actions/auth';
import { trackLoginEvent } from '@/lib/analytics';
import { Button } from '../ui/button';

const Login = () => {
  const handleLogin = () => {
    // GA 이벤트 추적
    trackLoginEvent('header');
    login();
  };

  return (
    <>
      <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={logout}>로그아웃</Button>
    </>
  );
};

export default Login;
