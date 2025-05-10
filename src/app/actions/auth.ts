'use server';

import { createClient } from '@/lib/supabase/server';

/* 로그인, 로그아웃 */
export async function login() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'dog@co.kr',
      password: '12345678',
    });
    if (error) throw error;
    if (data) return data;
  } catch (e) {
    console.error('로그인 실패', e);
  }
}
export async function logout() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (e) {
    console.error('로그아웃 실패', e);
  }
}
