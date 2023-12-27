import { RootState } from "@react-three/fiber";

export const getSavedCamera = (store: RootState) => {
  const item = localStorage.getItem("camera");

  if (item) {
    const { position, rotation } = JSON.parse(item);
    store.camera.position.set(position.x, position.y, position.z);
    store.camera.rotation.set(rotation.x, rotation.y, rotation.z);
  }
};
