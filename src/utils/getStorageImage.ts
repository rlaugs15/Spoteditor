export const getStoragePublicImage = (storedPath: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${storedPath}`;
