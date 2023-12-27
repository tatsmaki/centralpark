import { memo } from "react";
import { useEditor } from "../../services/editor";
import { useSelect } from "../../services/select";
import "./header.scss";

const HeaderComponent = () => {
  const { selected } = useSelect();
  const { hasChanges } = useEditor();

  const handleSave = () => {
    const { objects, store, setChanges } = useEditor.getState();

    localStorage.setItem("objects", JSON.stringify(objects));
    setChanges(false);

    if (store) {
      const { position, rotation } = store.camera;
      localStorage.setItem("camera", JSON.stringify({ position, rotation }));
    }
  };

  const handleDelete = () => {
    useEditor.getState().removeObject(selected);
  };

  return (
    <header className="header">
      <button
        className="header__save"
        disabled={!hasChanges}
        onClick={handleSave}
      >
        <span>💾</span> Save
      </button>
      <button
        className="header__delete"
        disabled={!selected}
        onClick={handleDelete}
      >
        Delete
      </button>
    </header>
  );
};

export const Header = memo(HeaderComponent);
