import { useRecoilValue } from "recoil";
import { screenLinesState } from "../recoil-atoms";
export function Screen() {
 
  const screenLines = useRecoilValue(screenLinesState);

  return (
    <>
      <div id="mahdi-screen-history">
        {screenLines.map((str,i) => (
          <div key={i} className="history">{str}</div>
        ))}
      </div>
    </>
  );
}
