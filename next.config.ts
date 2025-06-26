import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

// next-intl 플러그인 적용
const withNextIntl = createNextIntlPlugin();

// Server Components에서 번역을 사용하거나, setRequestLocale() 등 SSR용 API를 안정적으로 동작시키기 위해 반드시 필요
export default withNextIntl(nextConfig);
