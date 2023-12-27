import { PropsWithChildren } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

const map: KeyboardControlsEntry[] = [
  { name: "forward", keys: ["KeyW"] },
  { name: "back", keys: ["KeyS"] },
  { name: "left", keys: ["KeyA"] },
  { name: "right", keys: ["KeyD"] },
];

export const Keyboard = ({ children }: PropsWithChildren) => {
  return <KeyboardControls map={map}>{children}</KeyboardControls>;
};
