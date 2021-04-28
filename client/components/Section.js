import {Cpu} from "./Cpu";
import {Mem} from "./Memory";
import {Info} from "./Info";

const Section = (props) => {
  const {
    freeMem,
    totalMem,
    usedMem,
    memUseage,
    osType,
    upTime,
    cpuModel,
    numCores,
    cpuSpeed,
    cpuLoad,
    macAdress,
    isActive,
  } = props.data;

  const cpuSectionId = `cpu-section-${macAdress}`;
  const memSectionId = `mem-section-${macAdress}`;
  const cpu = {cpuLoad, cpuSectionId};
  const mem = {totalMem, usedMem, memUseage, freeMem, memSectionId};
  const info = {macA, osType, upTime, cpuModel, numCores, cpuSpeed};

  let notActiveDiv = "";
  if (!isActive) {
    notActiveDiv = <div className="not-active">Offline</div>;
  }
  return (
    <div className="widget col-sm-12">
      {notActiveDiv}
      <Cpu cpuData={cpu} />
      <Mem memData={mem} />
      <Info infoData={info} />
    </div>
  );
};
