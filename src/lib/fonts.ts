import { Prompt } from 'next/font/google';
import localFont from 'next/font/local';

export const prompt = Prompt({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-prompt',
});

export const untitled = localFont({
  src: [
    {
      path: '../app/assets/fonts/untitled/test-untitled-sans-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../app/assets/fonts/untitled/test-untitled-sans-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/assets/fonts/untitled/test-untitled-sans-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/assets/fonts/untitled/test-untitled-sans-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../app/assets/fonts/untitled/test-untitled-sans-black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-untitled',
  display: 'swap',
});

export const pretendard = localFont({
  src: '../app/assets/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  style: 'normal',
  variable: '--font-pretendard',
});
