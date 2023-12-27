import { memo } from "react";
import { Vector3 } from "three";
import { IObject } from "../../interfaces/object";
import { Object } from "./object";
import "./objects.scss";

const objects: IObject[] = [
  {
    uuid: "",
    id: "1",
    name: "fern plant",
    image_url: "/plant_bush.png",
    object_url: "/plant_bush.glb",
    scale: 0.001,
    position: new Vector3(),
  },
  {
    uuid: "",
    id: "2",
    name: "watermelon plant",
    image_url: "/watermelon_bush.png",
    object_url: "/watermelon_bush.glb",
    position: new Vector3(),
  },
];

const ObjectsComponent = () => {
  return (
    <div className="objects">
      <span>Objects</span>
      <div className="objects__list">
        {objects.map((object) => (
          <Object key={object.id} object={object} />
        ))}
      </div>
    </div>
  );
};

export const Objects = memo(ObjectsComponent);
