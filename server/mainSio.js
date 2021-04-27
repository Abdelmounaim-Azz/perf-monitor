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
  })
  socket.on('perfData',(data)=>{
    console.log(data)
  })
};
module.exports=mainSio;