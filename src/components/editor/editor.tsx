import { DragEvent, Suspense } from "react";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Ground } from "./ground";
import { Keyboard } from "./keyboard";
import { Object } from "./object";
import { useEditor } from "../../services/editor";
import "./editor.scss";
import { getPointer } from "../../helpers/get_pointer";
import { generateUUID } from "three/src/math/MathUtils.js";
import { PerspectiveCamera } from "three";
import { ObjectLoader } from "./object_loader";

const gl: CanvasProps["gl"] = { alpha: true, antialias: false };

const camera = new PerspectiveCamera(75);
camera.position.set(0, 3, 10);

export const Editor = () => {
  const { objects, is3D } = useEditor();

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    const data = event.dataTransfer.getData("text");
    const { store } = useEditor.getState();

    if (data && store) {
      const object = JSON.parse(data);
      const pointer = getPointer(event);
      const { raycaster, scene } = store;

      raycaster.setFromCamera(pointer, camera);
      const ground = scene.getObjectByName("ground");
      const [intersection] = raycaster.intersectObject(ground!);

      if (intersection) {
        const position = intersection.point;
        position.y = 0;

        useEditor.getState().setObject({
          ...object,
          uuid: generateUUID(),
          position,
        });
      }
    }
  };

  return (
    <Keyboard>
      <div className="editor" onDragOver={handleDragOver} onDrop={handleDrop}>
        <Canvas
          className="editor__main"
          autoFocus
          gl={gl}
          camera={camera}
          shadows="soft"
          onCreated={useEditor.getState().setStore}
        >
          <OrbitControls
            makeDefault
            maxPolarAngle={is3D ? Math.PI / 2.1 : -Math.PI / 2}
            minAzimuthAngle={is3D ? undefined : 0}
            maxAzimuthAngle={is3D ? undefined : 0}
            minDistance={5}
            maxDistance={20}
            enableRotate={is3D}
          />
          <ambientLight />
          <pointLight castShadow />
          <group name="objects">
            {objects.map((object) => (
              <Suspense
                key={object.uuid}
                fallback={<ObjectLoader position={object.position} />}
              >
                <Object object={object} />
              </Suspense>
            ))}
          </group>
          <Sky distance={450000} sunPosition={[0, 1, 0]} azimuth={0.25} />
          <Ground />
        </Canvas>
      </div>
    </Keyboard>
  );
};
