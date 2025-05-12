export const cacheTags = {
  user: 'user',
  publicUser: (userId: string) => `user:${userId}`,
} as const;
