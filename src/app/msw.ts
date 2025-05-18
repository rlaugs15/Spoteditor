'use client';

import { useEffect } from 'react';

export default function MSWProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      // 브라우저 환경에서만 import
      import('@/mocks/browser').then(({ worker }) => {
        worker.start({ onUnhandledRequest: 'bypass' });
      });
    }
  }, []);

  return null;
}
