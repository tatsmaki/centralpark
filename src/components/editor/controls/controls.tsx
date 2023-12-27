import { memo, useEffect } from "react";
import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { useMode } from "../../../services/editor";
import { useSelect } from "../../../services/select";

const ControlsComponent = () => {
  const { is3D } = useMode();
  const [sub] = useKeyboardControls();

  useEffect(() => {
    return sub(
      (state) => state.cancel,
      (pressed) => {
        pressed && useSelect.getState().deselect();
      }
    );
  }, [sub]);

  return (
    <>
      <OrbitControls
        makeDefault
        maxPolarAngle={is3D ? Math.PI / 2.1 : -Math.PI / 2}
        minAzimuthAngle={is3D ? undefined : 0}
        maxAzimuthAngle={is3D ? undefined : 0}
        minDistance={3}
        maxDistance={20}
        enableRotate={is3D}
      />
    </>
  );
};

export const Controls = memo(ControlsComponent);
