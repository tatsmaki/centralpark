import { DragEvent } from "react";
import { ObjectProps } from "./object.types";
import "./object.scss";

export const Object = ({ object }: ObjectProps) => {
  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", JSON.stringify(object));
  };

  return (
    <div className="object" draggable="true" onDragStart={handleDragStart}>
      <img className="object__image" draggable="false" src={object.image_url} />
      <span className="object__name">{object.name}</span>
    </div>
  );
};
