//node js program that gets performance data using os module and send it to the socket server.
const os =require('os');
const io=require("socket.io-client");
let socket=io('http://localhost:8181');


socket.on('connect',()=>{
  // console.log("I am connected to the server")
  const netInterface=os.networkInterfaces();
  let macAdress;
  for(let key in netInterface){
    if(!netInterface[key][0].internal){
      macAdress = netInterface[key][0].mac;
          break;
      }
  }
  socket.emit('auth','abdAzz:sio-client')
  //Send performance Data every second to the socket server
  
  let perfPayloadInterval=setInterval(()=>{
    performanceData().then((allData)=>{
      socket.emit('perfData',allData)
    })
  },1000)
})

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
  cpus.forEach((core)=>{
      for(type in core.times){
          totalMs += core.times[type];
      }
      idleMs += core.times.idle;
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
          const idleDiff = end.idle - start.idle;
          const totalDiff = end.total - start.total;
          const percentageCpu = 100 - Math.floor(100 * idleDiff / totalDiff);
          resolve(percentageCpu);
      },100)
  })
}



