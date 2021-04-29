import drawCircle from "../utils/canvasLoadAnimation";
import {useEffect, useState} from "react";
export function Mem(props) {
  const [canv, setCanv] = useState("");
  useEffect(() => {
    const canvas = document.getElementById(`${props.memData.memSectionId}`);
    setCanv(canvas);
  }, []);
  const {totalMem, usedMem, memUseage, freeMem} = props.memData;
  drawCircle(canv, memUseage * 100);
  const totalMemInGB = Math.floor((totalMem / 1073741824) * 100) / 100;
  const freeMemInGB = Math.floor((freeMem / 1073741824) * 100) / 100;
  return (
    <div className="col-sm-3 mem">
      <h3>Memory Useage</h3>
      <div className="canvas-wrapper">
        <canvas
          id={props.memData.memSectionId}
          width="200"
          height="200"
        ></canvas>
        <div className="mem-text">{memUseage * 100}%</div>
      </div>
      <div>Total Memory: {totalMemInGB}GB</div>
      <div>Free Memory: {freeMemInGB}GB</div>
    </div>
  );
}
