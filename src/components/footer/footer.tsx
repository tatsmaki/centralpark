import { useEditor } from "../../services/editor";
import "./footer.scss";

export const Footer = () => {
  const { is3D, set3D } = useEditor();

  const handle3D = () => {
    set3D(true);
  };

  const handlePerspective = () => {
    set3D(false);
  };

  return (
    <div className="footer">
      <button
        className={`footer__3d ${is3D && "footer__3d--active"}`}
        onClick={handle3D}
      >
        3D
      </button>
      <button
        className={`footer__perspective ${
          !is3D && "footer__perspective--active"
        }`}
        onClick={handlePerspective}
      >
        Perspective
      </button>
    </div>
  );
};
