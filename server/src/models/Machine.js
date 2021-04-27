const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const machineSchema = new Schema({
    macAdress: String,
    cpuLoad: Number,
    freeMem: Number,
    totalMem: Number,
    usedMem: Number,
    memUseage: Number,
    osType: String,
    upTime: Number,
    cpuModel: String,
    numCores: Number,
    cpuSpeed: Number,
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});
machineSchema.statics.build = (attrs) => {
    return new Machine(attrs);
  };
const Machine = mongoose.model('Machine',machineSchema);
module.exports=Machine;