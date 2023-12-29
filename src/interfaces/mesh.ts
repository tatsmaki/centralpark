import { Vector3 } from "three";
import { IObject } from "./object";

export interface IMesh extends IObject {
  uuid: string;
  position: Vector3;
}
