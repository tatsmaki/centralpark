import { create } from "zustand";
import { RootState } from "@react-three/fiber";
import { Vector3 } from "three";
import { getSavedMeshes } from "../../helpers/get_saved_meshes";
import { getSavedCamera } from "../../helpers/get_saved_camera";
import { IMesh } from "../../interfaces/mesh";

interface IEditor {
  store: RootState | null;
  hasChanges: boolean;
  meshes: IMesh[];
  setStore(store: RootState): void;
  setChanges(value: boolean): void;
  setMesh(mesh: IMesh): void;
  removeObject(uuid: string): void;
  updateObject(uuid: string, position: Vector3): void;
}

export const useEditor = create<IEditor>((set, get) => ({
  store: null,
  hasChanges: false,
  meshes: getSavedMeshes(),
  setStore(store) {
    getSavedCamera(store);
    set({ store });
  },
  setChanges(value) {
    set({ hasChanges: value });
  },
  setMesh(mesh) {
    set({ meshes: [...get().meshes, mesh], hasChanges: true });
  },
  removeObject(uuid) {
    set({
      meshes: get().meshes.filter((mesh) => uuid !== mesh.uuid),
      hasChanges: true,
    });
  },
  updateObject(uuid, position) {
    set({
      meshes: get().meshes.map((mesh) => {
        if (mesh.uuid === uuid) {
          return { ...mesh, position };
        }
        return mesh;
      }),
      hasChanges: true,
    });
  },
}));
