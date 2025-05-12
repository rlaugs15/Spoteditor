import { getUser } from '@/app/actions/fetch/user/getUser';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUser();
  return NextResponse.json({ user });
}
