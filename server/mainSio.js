const mainSio=(io,socket)=>{
  // console.log('main Socket Here!',socket.id)
  socket.on('perfData',(data)=>{
    console.log(data)
  })
};
module.exports=mainSio;