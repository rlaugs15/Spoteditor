'use client';

import ErrorTemplate from '@/components/common/ErrorTemplate';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorTemplate message={error.message} onReset={reset} />;
}
