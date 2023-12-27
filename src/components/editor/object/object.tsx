import { memo, useCallback, useMemo, useState } from "react";
import { TransformControls, useCursor, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import debounce from "lodash.debounce";
import { ObjectProps } from "./object.types";
import { useSelect } from "../../../services/select";
import { useEditor } from "../../../services/editor";

const debouncedChange = debounce((uuid: string, position: Vector3) => {
  useEditor.getState().updateObject(uuid, position);
}, 500);

const ObjectComponent = ({ object }: ObjectProps) => {
  const [isHover, setIsHover] = useState(false);
  useCursor(isHover);
  const { selected } = useSelect();
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
    gltf.scene.traverse((child) => {
      child.castShadow = true;
    });

    return gltf.scene.clone();
  }, [gltf, object]);

  const handlePointerOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    setIsHover(false);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (isSelected) {
      useSelect.getState().deselect();
    } else {
      useSelect.getState().select(object.uuid);
    }
  }, [isSelected, object]);

  const handleChange = useCallback(() => {
    const isChanged =
      object.position.x !== scene.position.x ||
      object.position.y !== scene.position.y ||
      object.position.z !== scene.position.z;

    if (isChanged) {
      debouncedChange(object.uuid, scene.position);
    }
  }, [scene.position, object]);

  return (
    <group>
      <primitive
        castShadow
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerUp={handlePointerUp}
      />
      {isSelected && (
        <TransformControls
          mode="translate"
          object={scene}
          onChange={handleChange}
        />
      )}
    </group>
  );
};

export const Object = memo(ObjectComponent);
