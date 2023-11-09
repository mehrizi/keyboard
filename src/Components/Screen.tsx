import { useRecoilValue } from "recoil";
import { screenLinesState } from "../recoil-atoms";
import "./screen.scss";
import { ScreenLine } from "./ScreenLine";

export function Screen() {
  const screenLines = useRecoilValue(screenLinesState);
  const last25Lines = screenLines.filter((ln,index)=>index>screenLines.length-26?true:false);

  return (
    <>
      <div id="mahdi-screen-history">
        {last25Lines.map((str, i) => (
            <ScreenLine key={i} line={str} />
          
        ))}
        <div className="blinker" >_</div>
      </div>
    </>
  );
}
