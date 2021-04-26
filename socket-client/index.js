//node js program that gets performance data using os module and send it to the socket server.
const os =require('os');

function performanceData(){
  return new Promise(async (resolve, reject)=>{
      const cpus = os.cpus();
      const freeMem = os.freemem();
      const totalMem = os.totalmem();
      const usedMem = totalMem - freeMem;
      const memUseage = Math.floor(usedMem/totalMem*100)/100;
      const osType = os.type() == 'Darwin' ? 'Mac' : os.type();
      const upTime = os.uptime();
      const cpuModel = cpus[0].model
      const numCores = cpus.length;
      const cpuSpeed = cpus[0].speed
      const cpuLoad = await getCpuLoad();
      const isActive = true;
      resolve({freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad,isActive})
  })
}

function cpuAverage(){
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((aCore)=>{
      for(type in aCore.times){
          totalMs += aCore.times[type];
      }
      idleMs += aCore.times.idle;
  });
  return {
      idle: idleMs / cpus.length,
      total: totalMs / cpus.length
  }
}

function getCpuLoad(){
  return new Promise((resolve, reject)=>{
      const start = cpuAverage();
      setTimeout(()=>{
          const end = cpuAverage();
          const idleDifference = end.idle - start.idle;
          const totalDifference = end.total - start.total;
          const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
          resolve(percentageCpu);
      },100)
  })
}



