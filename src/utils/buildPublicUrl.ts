import { StorageBucket } from '@/types/api/storage';

/* Public URL 생성 */
export function buildPublicUrl(bucket: StorageBucket, path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}
