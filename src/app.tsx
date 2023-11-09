import { Screen } from "./Components/Screen";
import { Keyboard } from "./Components/Keyboard";
import "./App.css";
import { useState } from "react";
import { context, contextType, getParentContext } from "./context";
import { useRecoilState } from "recoil";
import { screenLinesState } from "./recoil-atoms";
export default function App() {
  // let [currentId, setCurrentId] = useState(context[0].id);
  const [currentIdIndex, setCurrentIdIndex] = useState(0);
  const [currentContext, setCurrentContext] = useState<contextType>(context[0]);
  let [awaitingContext, setAwaitingContext] = useState<contextType | null>(
    null
  );
  const [currentText, setCurrentText] = useState(context[0].text[0]);
  const [screenLines, setScreenLines] =
    useRecoilState<string[]>(screenLinesState);

  const onKeyPressed = (key: Key) => {
    if (key.keyCode == 8) {
      // Backspace
      setScreenLines([]);
      setCurrentContext(context[0]);
      setCurrentIdIndex(0);
      setCurrentText(context[0].text[0]);
      return;
    }
    if (
      currentContext.type == "choice" ||
      currentContext.type == "multipleChoice"
    ) {
      const multipleChoice =
        currentContext.type == "multipleChoice"
          ? currentContext
          : getParentContext(currentContext.id, context);
      for (let i = 0; i < multipleChoice.children.length; i++) {
        if (
          key.character == multipleChoice.children[i].key ||
          key.shiftCharacter == multipleChoice.children[i].key
        ) {
          const choiceFirstChild = multipleChoice.children[i].children[0];
          setCurrentContext(choiceFirstChild);
          setCurrentIdIndex(0);
          setCurrentText(choiceFirstChild.text[0]);
        }
      }
    }
  };
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
      return;
    } else {
      if (currentContext.children && currentContext.type == "multipleChoice") {
        setChoice(currentContext.children[0]);
        return;
      }
      if (currentContext.type == "choice") {
        const parentContext = getParentContext(currentContext.id, context);
        if (!parentContext) return;
        for (let i = 1; i < parentContext.children.length; i++) {
          if (parentContext.children[i - 1].id == currentContext.id) {
            setChoice(parentContext.children[i]);
            return;
          }
        }
      }
    }
    // if no next content clear the text
    setCurrentText("");
  };
  return (
    <>
      <Screen />
      <Keyboard
        onTypeDone={() => typeDone()}
        onKeyPressed={onKeyPressed}
        text={currentText}
      />
    </>
  );
}
