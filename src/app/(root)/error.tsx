'use client';

import ErrorTemplate from '@/components/common/ErrorTemplate';

export default function Error({ error }: { error: Error }) {
  return <ErrorTemplate message={error.message} />;
}
