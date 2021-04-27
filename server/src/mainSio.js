const mongoose = require('mongoose');
const checkAndBuild=require('./utils/checkAndBuild')
const start=async ()=>{
  await mongoose.connect('mongodb://127.0.0.1/perfApp', { useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
}
start();
const mainSio=(io,socket)=>{
  let macA;
  // console.log('main Socket Here!',socket.id)
  socket.on('auth',(key)=>{
    if(key==="abdAzz:sio-client"){
      //Valid socket client
      socket.join('validSioClient')
    }
    else if(key==="abdAzz:UInextjs"){
      //valid UI client
      socket.join('validUi')
    }
    else{
      socket.disconnect(true)
    }
  })
  socket.on('init',async (initData)=>{
    macA=initData.macAdress;
    await checkAndBuild(initData);
  })
  socket.on('perfData',(data)=>{
    io.to('validUi').emit('data',data)
  })
};
module.exports=mainSio;