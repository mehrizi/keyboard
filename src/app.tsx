import { Screen } from "./Components/Screen";
import { Keyboard } from "./Components/Keyboard";
import "./App.css";
import { useState } from "react";
import { context, contextType, getParentContext } from "./context";
export default function App() {
  // let [currentId, setCurrentId] = useState(context[0].id);
  let [currentIdIndex, setCurrentIdIndex] = useState(0);
  const [currentContext, setCurrentContext] = useState<contextType>(context[0]);
  const [currentText, setCurrentText] = useState(context[0].text[0]);

  const typeDone = () => {
    setCurrentContextNextText();
  };
  const setChoice = (cntx: contextType) => {
    setCurrentContext(cntx);
    setCurrentIdIndex(0);
    setCurrentText(" - Press (" + cntx.key + ") to " + cntx.text[0]);
  };
  const setCurrentContextNextText = () => {
    if (currentIdIndex < currentContext.text.length - 1) {
      setCurrentIdIndex(currentIdIndex + 1);
      setCurrentText(currentContext.text[currentIdIndex + 1]);
    } else {
      if (currentContext.children && currentContext.type == "multipleChoice") {
        setChoice(currentContext.children[0]);
      }
      if (currentContext.type == "choice") {
        const parentContext = getParentContext(currentContext.id, context);
        if (!parentContext) return;
        for (let i = 1; i < parentContext.children.length; i++) {
          if (parentContext.children[i - 1].id == currentContext.id) {
            setChoice(parentContext.children[i]);
          }
        }
      }
    }
  };
  return (
    <>
      <Screen />
      <Keyboard onTypeDone={() => typeDone()} text={currentText} />
    </>
  );
}
