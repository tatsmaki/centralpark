import { create } from "zustand";
import { RootState } from "@react-three/fiber";
import { Vector3 } from "three";
import { IObject } from "../../interfaces/object";
import { getSavedObjects } from "../../helpers/get_saved_objects";
import { getSavedCamera } from "../../helpers/get_saved_camera";

interface IEditor {
  store: RootState | null;
  hasChanges: boolean;
  objects: IObject[];
  setStore(store: RootState): void;
  setChanges(value: boolean): void;
  setObject(object: IObject): void;
  removeObject(uuid: string): void;
  updateObject(uuid: string, position: Vector3): void;
}

export const useEditor = create<IEditor>((set, get) => ({
  store: null,
  hasChanges: false,
  objects: getSavedObjects(),
  setStore(store) {
    getSavedCamera(store);
    set({ store });
  },
  setChanges(value) {
    set({ hasChanges: value });
  },
  setObject(object) {
    set({ objects: [...get().objects, object], hasChanges: true });
  },
  removeObject(uuid) {
    set({
      objects: get().objects.filter((object) => uuid !== object.uuid),
      hasChanges: true,
    });
  },
  updateObject(uuid, position) {
    set({
      objects: get().objects.map((object) => {
        if (object.uuid === uuid) {
          return { ...object, position };
        }
        return object;
      }),
      hasChanges: true,
    });
  },
}));
