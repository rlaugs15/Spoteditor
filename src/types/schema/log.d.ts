import { z } from 'zod';

export type LogFormValues = z.infer<typeof formSchema>;
