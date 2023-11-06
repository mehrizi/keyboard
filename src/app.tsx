import { useEffect, useState } from "preact/hooks";
import "./keyboard.scss";
import { keyboardKeys } from "./assets/keyboard.json";
import { useRecoilState } from "recoil";
import { typedStringState, typedStringsState } from "./recoil-atoms";
type Key = {
  title: string;
  classes: string[];
  row: number;
  keyCode: number;
  character: string;
  disabled?: boolean;
  pressed?: false;
};

export function App() {
  const [typedString, setTypedString] = useRecoilState(typedStringState);
  const [charactersToType, setCharactersToType] = useState(
    "Hello I hope you are well"
  );
  const [typedStrings, setTypedStrings] = useRecoilState(typedStringsState);
  const [keys, setKeys] = useState([...keyboardKeys]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      const filteredKeys = keys.filter((k) => event.keyCode == k.keyCode);

      if (filteredKeys.length == 0) return;

      onKeyPressed(filteredKeys[0]);
    };

    document.addEventListener("keydown", handleKeyDown);
    setTimeout(() => {
      typeString(charactersToType,charactersToType);
    }, 500);

    // Remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const typeString = (str: string, originalStr:string) => {
    const key: Key = keys.filter(
      (k: Key) => str[0].toUpperCase() == k.character
    )[0];

    onKeyPressed(key);
    // setTypedString(c=>c+str[0]);
    if (str.length == 1) {
      setTypedStrings((currentTypedStrs) => [originalStr, ...currentTypedStrs]);
      return;
    }
    setTimeout(() => typeString(str.slice(1),originalStr), 200);
  };
  const setPressed = (key: Key, currentKeys: Key[]) => {
    return [
      ...currentKeys.map((k) =>
        k.keyCode == key.keyCode ? { ...key, pressed: true } : k
      ),
    ];
  };
  const setPressedRelease = (key: Key, currentKeys: Key[]) => {
    return [
      ...currentKeys.map((k) =>
        k.keyCode == key.keyCode ? { ...key, pressed: false } : k
      ),
    ];
  };
  const onKeyPressed = (key: Key) => {
    if (key.disabled) return;
    switch (key.keyCode) {
      case 8: //backspace
        setTypedString((prevTypedString) => prevTypedString.slice(0, -1));
        break;
      default:
        setTypedString((prevTypedString) => prevTypedString + key.character);
        //  setTypedString(typedString + key.title);
        break;
    }
    setKeys((currentKeys) => setPressed(key, currentKeys));
    setTimeout(() => {
      setKeys((currentKeys) => setPressedRelease(key, currentKeys));
    }, 250);
  };

  return (
    <>
      <div id="mahdi-screen-history">
        {typedStrings.map((str) => (
          <div class="history">{str}</div>
        ))}
      </div>
      <div id="mahdi-screen">{typedString}</div>
      <div id="mahdi-keyboard">
        {keys.map((key: Key, i: number) => {
          let baseClasses = "row-" + key.row;
          if (key.pressed) baseClasses += " pressed";
          if (key.disabled) baseClasses += " disable";
          let classes: string = key.classes.reduce(
            (classCollect: string, className: string) =>
              classCollect + " key-" + className,
            baseClasses
          );
          return (
            <div
              onClick={(e) => onKeyPressed(key)}
              key={i}
              class={"keyboard-key " + classes}
            >
              {key.title}
            </div>
          );
        })}
      </div>
    </>
  );
}
