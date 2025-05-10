import { login, logout } from '@/app/actions/auth';
import { Button } from '../ui/button';

const Login = () => {
  return (
    <>
      <Button onClick={login}>로그인</Button>
      <Button onClick={logout}>로그아웃</Button>
    </>
  );
};

export default Login;
