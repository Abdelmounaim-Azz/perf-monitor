import drawCircle from "../utils/canvasLoadAnimation";
import {useEffect, useState} from "react";
export function Cpu(props) {
  const [canv, setCanv] = useState("");
  useEffect(() => {
    const canvas = document.getElementById(`${props.cpuData.cpuSectionId}`);
    setCanv(canvas);
  }, []);

  drawCircle(canv, props.cpuData.cpuLoad);
  return (
    <div className="col-sm-3 cpu">
      <h3>CPU load</h3>
      <div className="canvas-wrapper">
        <canvas
          id={props.cpuData.cpuSectionId}
          width="200"
          height="200"
        ></canvas>
        <div className="cpu-text">{props.cpuData.cpuLoad}%</div>
      </div>
    </div>
  );
}
