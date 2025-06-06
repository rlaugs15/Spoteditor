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
  openSigunguDropBoxDirectly: () => void;
}

export const useCitySearchStore = create<CitySearchState>((set, get) => ({
  isDropBox: false,
  isCityDropBox: false,
  isSigunguDropBox: false,
  city: '서울',
  sigungu: '송파구',

  openDropBox: () => set(() => ({ isDropBox: true, city: '', sigungu: '' })),
  closeDropBox: () =>
    set(() => ({ isDropBox: false, isSigunguDropBox: false, isCityDropBox: false })),
  toggleCityDropBox: () => {
    const { isCityDropBox } = get();
    if (isCityDropBox) {
      // 이미 시 선택창이 열려있는 상태에서 다시 클릭하면 -> 구 리스트로 이동
      set(() => ({
        isCityDropBox: false,
        isSigunguDropBox: true,
        isDropBox: true,
      }));
    } else {
      // 기본 시 선택창 열기
      set(() => ({
        isCityDropBox: true,
        isSigunguDropBox: false,
        isDropBox: true,
      }));
    }
  },
  toggleSigunguDropBox: () =>
    set((state) => ({ isSigunguDropBox: !state.isSigunguDropBox, isDropBox: !state.isDropBox })),
  openSigunguDropBoxDirectly: () =>
    set(() => ({
      isDropBox: true,
      isSigunguDropBox: true,
      isCityDropBox: false,
    })),
  setcity: (city) => set(() => ({ city })),
  setsigungu: (sigungu) => set(() => ({ sigungu })),
}));
