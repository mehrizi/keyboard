import { useEffect, useState } from "react";
import "./keyboard.scss";
import { keyboardKeys } from "../assets/keyboard.json";
import { useRecoilState } from "recoil";
import { screenLinesState } from "../recoil-atoms";
import deepclone from "deepclone";
type Key = {
  title: string;
  classes: string[];
  row: number;
  keyCode: number;
  character: string;
  disabled?: boolean;
  pressed?: false;
};
type KeyboardProps = {
  lockInput?: boolean;
  typeDone?: Function;
  text?: string;
};
type ScreenLines = string[];

export function Keyboard(props: KeyboardProps) {
  const lockInput: boolean = props.lockInput ?? false;
  const text: string = props.text ?? "";
  let [currentIndex, setCurrentIndex] = useState(0);
  const [screenLines, setScreenLines] =
    useRecoilState<ScreenLines>(screenLinesState);
  const [keys, setKeys] = useState([...deepclone(keyboardKeys)]);
  if (!lockInput) {
    useEffect(() => {
      const handleKeyDown = (event) => {
        const filteredKeys = keys.filter((k) => event.keyCode == k.keyCode);

        if (filteredKeys.length == 0) return;

        onKeyPressed(filteredKeys[0]);
      };

      document.addEventListener("keydown", handleKeyDown);
      // Remove the event listener
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  }
  // screenLines[screenLines.length - 1] = text;
  // setScreenLines([...screenLines]);
  //

  // useEffect(() => {
  //   return;
  //   const interval = setInterval(() => {
  //     if (currentIndex < text.length) {
  //       typeString(text[currentIndex]);
  //       setCurrentIndex((prevIndex) => prevIndex + 1);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 200); // 200 milliseconds (0.2 seconds)

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [text]);
  // useEffect(() => {
  //   const b = text;
  // });
  const typeString = (str: string) => {
    const key: Key = keys.filter(
      (k: Key) => str[currentIndex].toUpperCase() == k.character
    )[0];

    if (key) onKeyPressed(key);

    if (str.length > currentIndex + 1) {
      currentIndex++;
      setCurrentIndex(currentIndex);
      setTimeout(() => typeString(str), 200);
    }
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
        setScreenLines([
          ...screenLines.map((ln, ind) =>
            ind == screenLines.length - 1
              ? ln.length > 0
                ? ln.slice(0, -1)
                : ln
              : ln
          ),
        ]);
        break;
      default:
        setScreenLines((csl) => [
          ...csl.map((ln, ind) =>
            ind == csl.length - 1 ? ln + key.character : ln
          ),
        ]);

        // setScreenLines((currentScreenLines) => {
        //   setScreenLines([...screenLines.map((ln,ind)=>ind==screenLines.length - 1?ln+key.character:ln]);

        // });
        //  setTypedString(typedString + key.title);
        break;
    }
    setKeys((currentKeys) => setPressed(key, currentKeys));
    setTimeout(() => {
      setKeys((currentKeys) => setPressedRelease(key, currentKeys));
    }, 100);
  };
  let typingString = false;
  useEffect(() => {
    if (!typingString)
    {
      typingString = true;
      setTimeout(() => typeString(text), 100);
    }
    
  },[]);

  return (
    <>
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
              className={"keyboard-key " + classes}
            >
              {key.title}
            </div>
          );
        })}
      </div>
    </>
  );
}
