import { QueryProvider } from './QueryProvider';

/* Provider를 독립적인 파일로 관리하고, 한곳에서 모든 Provider 관리 */

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <MSWProvider /> */}
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
