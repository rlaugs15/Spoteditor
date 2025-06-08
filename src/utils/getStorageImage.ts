import { StorageBucket } from '@/types/api/storage';

export const getStoragePublicImage = (storedPath: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${storedPath}`;

export function buildPublicUrl(bucket: StorageBucket, path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}
