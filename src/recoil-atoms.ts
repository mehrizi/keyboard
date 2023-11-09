import { atom } from "recoil";

export const screenLinesState = atom({
    key: 'screenLines',
    default: [],
  });
  
  export const typedStringState = atom({
    key: 'typedString',
    default: "",
  });