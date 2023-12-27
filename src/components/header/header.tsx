import { useEditor } from "../../services/editor";
import { useSelect } from "../../services/select";
import "./header.scss";

export const Header = () => {
  const { selected } = useSelect();

  const handleSave = () => {
    const { objects, store } = useEditor.getState();

    localStorage.setItem("objects", JSON.stringify(objects));

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
      <button className="header__save" onClick={handleSave}>
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
