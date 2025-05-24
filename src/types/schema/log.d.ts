import { formSchema } from '@/lib/zod/logSchema';
import { z } from 'zod';

export type LogFormValues = z.infer<typeof formSchema>;
export type NewPlace = Omit<Tables<'place'>, 'created_at'>;
export type NewTag = {
  category: string;
  tag: string;
  log_id: string;
};
export type NewPlaceImage = Omit<Tables<'place_images'>, 'created_at' | 'updated_at'>;
export type NewAddress = Omit<Tables<'address'>, 'created_at'>;
export type NewLog = Omit<Tables<'log'>, 'created_at'>;
