export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  publicUser: (userId: string) => [...userKeys.all, 'public', userId] as const,
};
