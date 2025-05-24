import { TAG_SETS } from '@/constants/tagData';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/* 태그 */
export type TagKeys = keyof typeof TAG_SETS;
export type MultiKeys = Extract<TagKeys, 'mood' | 'activity'>; // 다중 선택
export type SingleKeys = Exclude<TagKeys, MultiKeys>; // 단일 선택

type TagStates = {
  mood: string[];
  activity: string[];
  country: string;
  city: string;
  sigungu: string;
};
type TagActions = {
  toggleMultiTag: (key: MultiKeys, tag: string) => void;
  setSingleTag: (key: SingleKeys, tag: string) => void;
  clearTag: () => void;
};

type LogCreationStoreType = TagStates & TagActions;

const initialState: TagStates = {
  mood: [] as string[],
  activity: [] as string[],
  country: '',
  city: '',
  sigungu: '',
};

export const useLogCreationStore = create<LogCreationStoreType>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      toggleMultiTag: (key, tag) => {
        const state = get();
        const tags = state[key];
        const totalSelected = state.mood.length + state.activity.length;
        const isSelected = tags.includes(tag);

        if (!isSelected && totalSelected >= 6) return; // 최대 6개만
        set((state) => {
          state[key] = isSelected ? tags.filter((t) => t != tag) : [...tags, tag];
        });
      },
      setSingleTag: (key, tag) =>
        set((state) => {
          state[key] = tag;
        }),
      clearTag: () =>
        set((state) => {
          state.mood = [];
          state.activity = [];
          state.country = '';
          state.city = '';
          state.sigungu = '';
        }),
    })),
    { name: 'logCreation' }
  )
);
