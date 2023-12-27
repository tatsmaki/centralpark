import { degToRad } from "three/src/math/MathUtils.js";

export const Ground = () => {
  return (
    <mesh
      name="ground"
      position={[0, 0, 0]}
      rotation={[degToRad(-90), 0, 0]}
      scale-z={1}
      receiveShadow
    >
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={0xc9ff8b} />
    </mesh>
  );
};
