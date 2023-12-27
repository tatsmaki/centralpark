import { Footer } from "../footer";
import { Header } from "../header";
import { Objects } from "../objects";
import { Editor } from "../editor";
import "./app.scss";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Editor />
      <Objects />
      <Footer />
    </div>
  );
};
