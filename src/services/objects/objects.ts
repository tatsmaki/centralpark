import { create } from "zustand";
import { IObject } from "../../interfaces/object";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";

interface IObjects {
  objects: IObject[];
  getObjects(): Promise<IObject[]>;
}

export const useObjects = create<IObjects>((set) => ({
  objects: [],
  async getObjects() {
    const objectsCol = collection(database, "objects");
    const objectsSnap = await getDocs(objectsCol);

    const objects = objectsSnap.docs.map((doc) => {
      const data = doc.data();
      const object = { ...data, id: doc.id } as IObject;

      return object;
    });

    set({ objects });
    return objects;
  },
}));
