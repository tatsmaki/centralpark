import { create } from "zustand";
import { IObject } from "../../interfaces/object";
import { RootState } from "@react-three/fiber";
import { getSavedObjects } from "../../helpers/get_saved_objects";

interface IEditor {
  objects: IObject[];
  store: RootState | null;
  is3D: boolean;
  setObject(object: IObject): void;
  removeObject(uuid: string): void;
  setStore(store: RootState): void;
  set3D(value: boolean): void;
}

export const useEditor = create<IEditor>((set, get) => ({
  objects: getSavedObjects(),
  store: null,
  is3D: true,
  setObject(object) {
    set({ objects: [...get().objects, object] });
  },
  removeObject(uuid) {
    set({ objects: get().objects.filter((object) => uuid !== object.uuid) });
  },
  setStore(store) {
    const item = localStorage.getItem("camera");
    if (item) {
      const { position, rotation } = JSON.parse(item);
      store.camera.position.set(position.x, position.y, position.z);
      store.camera.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    set({ store });
  },
  set3D(value) {
    set({ is3D: value });
  },
}));