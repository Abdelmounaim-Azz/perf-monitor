import drawCircle from "../utils/canvasLoadAnimation";

export function Cpu(props) {
  const canvas = document.querySelector(`.${props.cpuData.cpuSectionId}`);
  drawCircle(canvas, props.cpuData.cpuLoad);
  return (
    <div className="col-sm-3 cpu">
      <h3>CPU load</h3>
      <div className="canvas-wrapper">
        <canvas
          className={props.cpuData.cpuWidgetId}
          width="200"
          height="200"
        ></canvas>
        <div className="cpu-text">{props.cpuData.cpuLoad}%</div>
      </div>
    </div>
  );
}
