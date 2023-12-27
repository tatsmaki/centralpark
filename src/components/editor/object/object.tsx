import { useMemo, useState } from "react";
import { TransformControls, useCursor, useGLTF } from "@react-three/drei";
import { ObjectProps } from "./object.types";
import { useSelect } from "../../../services/select";

export const Object = ({ object }: ObjectProps) => {
  const [isHover, setIsHover] = useState(false);
  useCursor(isHover);
  const { selected, select, deselect } = useSelect();
  const isSelected = selected === object.uuid;

  const gltf = useGLTF(object.object_url);

  const scene = useMemo(() => {
    const { scale, position } = object;
    if (scale) {
      gltf.scene.scale.set(scale, scale, scale);
    }
    if (position) {
      gltf.scene.position.set(position.x, position.y, position.z);
    }
    return gltf.scene.clone();
  }, [gltf, object]);

  const handlePointerOver = () => {
    setIsHover(true);
  };

  const handlePointerOut = () => {
    setIsHover(false);
  };

  const handlePointerUp = () => {
    if (isSelected) {
      deselect();
    } else {
      select(object.uuid!);
    }
  };

  return (
    <group>
      <primitive
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerUp={handlePointerUp}
      />
      {isSelected && <TransformControls mode="translate" object={scene} />}
    </group>
  );
};
