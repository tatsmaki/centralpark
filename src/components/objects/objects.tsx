import { memo, useEffect } from "react";
import { Object } from "./object";
import "./objects.scss";
import { useObjects } from "../../services/objects";

const ObjectsComponent = () => {
  const { objects, getObjects } = useObjects();

  useEffect(() => {
    getObjects();
  }, [getObjects]);

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
