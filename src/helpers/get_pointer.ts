import { DragEvent, MouseEvent } from "react";
import { Vector2 } from "three";

export const getPointer = (event: MouseEvent | DragEvent): Vector2 => {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = (event.clientX / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.y) / rect.height) * 2 + 1;

  return new Vector2(x, y);
};
