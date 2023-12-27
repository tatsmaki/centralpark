import { Footer } from "../footer";
import { Header } from "../header";
import { Objects } from "../objects";
import { Editor } from "../editor";
import "./app.scss";
import { Keyboard } from "../keyboard";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Keyboard>
        <Editor />
      </Keyboard>
      <Objects />
      <Footer />
    </div>
  );
};
