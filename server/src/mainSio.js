const mongoose = require('mongoose');
const Machine = require('./models/Machine');
const start=async ()=>{
  await mongoose.connect('mongodb://127.0.0.1/perfApp', { useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
}
start();
const mainSio=(io,socket)=>{
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
  socket.on('init',(initData)=>{
    console.log(initData)
  })
  socket.on('perfData',(data)=>{
    console.log(data)
  })
};
module.exports=mainSio;