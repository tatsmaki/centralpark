import { memo } from "react";
import { useMode } from "../../services/editor";
import "./footer.scss";

const FooterComponent = () => {
  const { is3D, set3D } = useMode();

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

export const Footer = memo(FooterComponent);
