const Machine = require('./models/Machine');
const mongoose = require('mongoose');
const checkAndBuild=async (data)=>{
  const machine=await Machine.findOne({macA:data.macAdress});
  if(!machine){
    const newMachine=await Machine.build(data);
    await newMachine.save();
  }
}