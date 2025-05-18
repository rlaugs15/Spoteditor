import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  toggleSearchBar: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  toggleSearchBar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
