import { create } from "zustand";

interface ISelectState {
  selected: string;
  select(uuid: string): void;
  deselect(): void;
}

export const useSelect = create<ISelectState>((set) => ({
  selected: "",
  select(uuid) {
    set({ selected: uuid });
  },
  deselect() {
    set({ selected: "" });
  },
}));
