import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  toggleSearchBar: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  toggleSearchBar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface CitySearchState {
  isDropBox: boolean;
  isCityDropBox: boolean;
  isSigunguDropBox: boolean;
  city: string;
  sigungu: string;
  openDropBox: () => void;
  closeDropBox: () => void;
  toggleCityDropBox: () => void;
  toggleSigunguDropBox: () => void;
  setcity: (city: string) => void;
  setsigungu: (sigungu: string) => void;
}

export const useCitySearchStore = create<CitySearchState>((set) => ({
  isDropBox: false,
  isCityDropBox: false,
  isSigunguDropBox: false,
  city: '서울',
  sigungu: '송파구',

  openDropBox: () => set(() => ({ isDropBox: true, city: '', sigungu: '' })),
  closeDropBox: () =>
    set(() => ({ isDropBox: false, isSigunguDropBox: false, isCityDropBox: false })),
  toggleCityDropBox: () =>
    set((state) => ({ isCityDropBox: !state.isCityDropBox, isDropBox: !state.isDropBox })),
  toggleSigunguDropBox: () =>
    set((state) => ({ isSigunguDropBox: !state.isSigunguDropBox, isDropBox: !state.isDropBox })),
  setcity: (city) => set(() => ({ city })),
  setsigungu: (sigungu) => set(() => ({ sigungu })),
}));
