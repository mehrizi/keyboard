import { useRecoilValue } from "recoil";
import { screenLinesState } from "../recoil-atoms";
import "./screen.scss";

export function Screen() {
  const screenLines = useRecoilValue(screenLinesState);
  const last25Lines = screenLines.filter((ln,index)=>index>screenLines.length-26?true:false);

  return (
    <>
      <pre id="mahdi-screen-history">
        {last25Lines.map((str, i) => (
          <div key={i} className="history">
            {str}
          </div>
          
        ))}
        <div className="blinker" >_</div>
      </pre>
    </>
  );
}
