import { Vector3 } from "three";

export interface IObject {
  uuid?: string;
  id: string;
  name: string;
  image_url: string;
  object_url: string;
  scale?: number;
  position: Vector3;
}
