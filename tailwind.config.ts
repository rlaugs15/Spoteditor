// tailwind.config.ts
import scrollbar from 'tailwind-scrollbar';
import scrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';

export default {
  plugins: [scrollbarHide, scrollbar],
} satisfies Config;
