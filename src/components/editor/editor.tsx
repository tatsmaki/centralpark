import { DragEvent, Suspense, memo, useCallback, useEffect } from "react";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { OrbitControls, Sky, useKeyboardControls } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import { generateUUID } from "three/src/math/MathUtils.js";
import { Ground } from "./ground";
import { Object } from "./object";
import { ObjectLoader } from "./object_loader";
import { useEditor, useMode } from "../../services/editor";
import { getPointer } from "../../helpers/get_pointer";
import { useSelect } from "../../services/select";
import "./editor.scss";

const gl: Partial<CanvasProps["gl"]> = {
  alpha: true,
  antialias: true,
};

const camera = new PerspectiveCamera(75);
camera.position.set(0, 3, 10);

const EditorComponent = () => {
  const { objects, setStore } = useEditor();
  const { is3D } = useMode();
  const [sub] = useKeyboardControls();

  useEffect(() => {
    return sub(
      (state) => state.cancel,
      (pressed) => {
        pressed && useSelect.getState().deselect();
      }
    );
  }, [sub]);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: DragEvent) => {
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
  }, []);

  return (
    <div className="editor" onDragOver={handleDragOver} onDrop={handleDrop}>
      <Canvas
        className="editor__main"
        autoFocus
        gl={gl}
        camera={camera}
        shadows
        onCreated={setStore}
      >
        <OrbitControls
          makeDefault
          maxPolarAngle={is3D ? Math.PI / 2.1 : -Math.PI / 2}
          minAzimuthAngle={is3D ? undefined : 0}
          maxAzimuthAngle={is3D ? undefined : 0}
          minDistance={3}
          maxDistance={20}
          enableRotate={is3D}
        />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow intensity={0.5} position={[10, 10, -10]} />
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
  );
};

export const Editor = memo(EditorComponent);
