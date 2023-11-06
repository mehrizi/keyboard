import { atom } from "recoil";

export const typedStringsState = atom({
    key: 'typedStrings',
    default: [],
  });
  
  export const typedStringState = atom({
    key: 'typedString',
    default: "",
  });