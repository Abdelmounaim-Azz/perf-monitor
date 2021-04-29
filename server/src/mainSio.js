const mongoose = require("mongoose");
const Machine = require("./models/Machine");
const checkAndBuild = require("./utils/checkAndBuild");
const start = async () => {
  await mongoose.connect("mongodb://127.0.0.1/perfApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
start();
const mainSio = (io, socket) => {
  let macA;
  // console.log('main Socket Here!',socket.id)
  socket.on("auth", (key) => {
    if (key === "abdAzz:sio-client") {
      //Valid socket client
      socket.join("validSioClient");
      console.log("client UI joined");
      Machine.find({}, (err, docs) => {
        docs.forEach((mc) => {
          mc.isActive = false;
          io.to("validUi").emit("data", mc);
        });
      });
    } else if (key === "abdAzz:UInextjs") {
      //valid UI client
      socket.join("validUi");
    } else {
      socket.disconnect(true);
    }
  });
  socket.on("init", async (initData) => {
    macA = initData.macAdress;
    await checkAndBuild(initData);
  });
  socket.on("perfData", (data) => {
    io.to("validUi").emit("data", data);
  });
  socket.on("disconnect", () => {
    Machine.find({macAdress}, (err, docs) => {
      if (docs.length > 0) {
        docs[0].isActive = false;
        io.to("validUi").emit("data", docs[0]);
      }
    });
  });
};
module.exports = mainSio;
