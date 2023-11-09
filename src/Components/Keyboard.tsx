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
  onTypeDone?: Function;
  onKeyPressed?: Function;
  text?: string;
};

export function Keyboard(props: KeyboardProps) {
  const lockInput: boolean = props.lockInput ?? false;
  // const text: string = props.text ?? "";
  let [currentIndex, setCurrentIndex] = useState(0);
  const [screenLines, setScreenLines] =
    useRecoilState<string[]>(screenLinesState);
  const [keys, setKeys] = useState([...deepclone(keyboardKeys)]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!props.text)
      return;
      if (currentIndex < props.text.length) {
        typeString(props.text)
        // setDisplayedString((prevString) => prevString + props.text[currentIndex]);
        currentIndex++;
        // setCurrentIndex((prevIndex) => prevIndex + 1);
        setCurrentIndex(currentIndex);
      } else {
        clearInterval(interval);
        // const enterKey: Key = keys.filter((k: Key) => 13 == k.keyCode)[0];
        // onKeyPressed(enterKey);
        // currentIndex=0;
        // setCurrentIndex(currentIndex);
        if (props.onTypeDone) props.onTypeDone();

      }
    }, 50); // 200 milliseconds (0.2 seconds)

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex,props.text]);

  useEffect(() => {
    currentIndex=0;
    setScreenLines((csl) => csl[csl.length-1] == ''?csl:[...csl, ""]);
    setCurrentIndex(currentIndex);

  }, [props.text]);




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
  const typeString = (str: string) => {
    const key: Key = keys.filter(
      (k: Key) => str[currentIndex] == k.character || str[currentIndex] == k.shiftCharacter
    )[0];

    if (key) onKeyPressed(key,false,str[currentIndex]);

    // if (str.length > currentIndex + 1) {
    //   currentIndex++;
    //   setCurrentIndex(currentIndex);
    //   setTimeout(() => typeString(str), 100);
    // } else {
    //   const enterKey: Key = keys.filter((k: Key) => 13 == k.keyCode)[0];
    //   onKeyPressed(enterKey);
    //   typingString = false;
    //   if (props.onTypeDone) props.onTypeDone();
    // }
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
  const onKeyPressed = (key: Key, native:boolean=false, char: string='') => {
    char = char==''?key.character:char;
    if (key.disabled) return;
    if (native && props.onKeyPressed)
      props.onKeyPressed(key)
    switch (key.keyCode) {
      case 8: // Backspace
        setScreenLines((csl) => [
          ...csl.map((ln, ind) =>
            ind == csl.length - 1 ? (ln.length > 0 ? ln.slice(0, -1) : ln) : ln
          ),
        ]);
        break;
      case 13: // Enter
        setScreenLines((csl) => [...csl, ""]);
        break;
      default:
        setScreenLines((csl) => [
          ...csl.map((ln, ind) =>
            ind == csl.length - 1 ? ln + char : ln
          ),
        ]);
        break;
    }
    setKeys((currentKeys) => setPressed(key, currentKeys));
    setTimeout(() => {
      setKeys((currentKeys) => setPressedRelease(key, currentKeys));
    }, 50);
  };
  // let typingString = false;
  // useEffect(() => {
  //   if (!typingString) {
  //     typingString = true;
  //     currentIndex = 0;
  //     setCurrentIndex(currentIndex);
  //     setTimeout(() => typeString( props.text), 500);
  //   }
  // }, [ props.text]);

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
              onClick={(e) => onKeyPressed(key,true)}
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
