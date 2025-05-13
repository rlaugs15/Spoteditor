'use server';

import { createClient } from '@/lib/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL_LOCAL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
};

const signInWithGoogle = signInWith('google');
const signInWithKakao = signInWith('kakao');

export { signInWithGoogle, signInWithKakao };
