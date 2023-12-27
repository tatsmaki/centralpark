import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { ObjectLoaderProps } from "./object_loader.types";

export const ObjectLoader = ({ position }: ObjectLoaderProps) => {
  const ref = useRef<Mesh>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.y += 0.5;
    }
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
    </mesh>
  );
};
