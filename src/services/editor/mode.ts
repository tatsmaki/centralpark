import { create } from "zustand";

interface IMode {
  is3D: boolean;
  set3D(value: boolean): void;
}

export const useMode = create<IMode>((set) => ({
  is3D: true,
  set3D(value) {
    set({ is3D: value });
  },
}));
