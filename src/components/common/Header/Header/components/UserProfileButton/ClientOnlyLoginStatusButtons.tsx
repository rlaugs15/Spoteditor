'use client';

import { IUser } from '@/types/api/user';
import LoginStatusButtons from '../LoginStatusButtons';

export default function ClientOnlyLoginStatusButtons({ user }: { user: IUser }) {
  return <LoginStatusButtons user={user} />;
}
