import { create } from 'zustand';

type TabType = 'myLog' | 'savedSpaces' | 'savedLog';

interface ProfileTabStore {
  tab: TabType;
  setTab: (tab: TabType) => void;
}

export const useProfileTabStore = create<ProfileTabStore>((set) => ({
  tab: 'myLog',
  setTab: (tab) => set({ tab }),
}));
