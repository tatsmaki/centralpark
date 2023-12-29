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

const ObjectComponent = ({ mesh }: ObjectProps) => {
  const [isHover, setIsHover] = useState(false);
  useCursor(isHover);
  const { selected } = useSelect();
  const isSelected = selected === mesh.uuid;

  const { scene } = useGLTF(mesh.object_url);

  const gltf = useMemo(() => {
    const { scale, position } = mesh;

    if (scale) {
      scene.scale.set(scale, scale, scale);
    }
    if (position) {
      scene.position.set(position.x, position.y, position.z);
    }
    scene.traverse((child) => {
      child.castShadow = true;
    });

    return scene.clone();
  }, [scene, mesh]);

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
      useSelect.getState().select(mesh.uuid);
    }
  }, [isSelected, mesh]);

  const handleChange = useCallback(() => {
    const isChanged =
      mesh.position.x !== gltf.position.x ||
      mesh.position.y !== gltf.position.y ||
      mesh.position.z !== gltf.position.z;

    if (isChanged) {
      debouncedChange(mesh.uuid, gltf.position);
    }
  }, [gltf.position, mesh]);

  return (
    <group>
      <primitive
        castShadow
        object={gltf}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerUp={handlePointerUp}
      />
      {isSelected && (
        <TransformControls
          mode="translate"
          object={gltf}
          onChange={handleChange}
        />
      )}
    </group>
  );
};

export const Object = memo(ObjectComponent);
