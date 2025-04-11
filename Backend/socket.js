const socketIo = require("socket.io");
const userModel = require("./models/user.model.js");
const captionModel = require("./models/caption.model.js");
let io;
function initilizeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Client Connected: ", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      try {
        if (userType === "user") {
          const user = await userModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true } // Ensures the updated document is returned
          );
          if (!user) {
            console.log(`User with ID ${userId} not found.`);
          } else {
            // console.log("User updated:", user);
          }
        } else {
          const caption = await captionModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
          if (!caption) {
            console.log(`Caption with ID ${userId} not found.`);
          } else {
            
          }
        }
      } catch (error) {
        console.error("Error updating socket ID:", error);
      }
    });
    socket.on("send-message",dataObject=>{
      console.log(dataObject);
      if (io){
        io.to(dataObject?.socketId).emit("recive-message",dataObject);
      }else{
        console.log('Socket.io not initialized.');
      }
    })
    socket.on("update-location-captain",async(data)=>{
      const { userId, location } = data;
      try {
        if (!location || !location.ltd || !location.lng) {
          return socket.emit('error', { message: 'Invalid location data' });
      }
      // console.log(location.ltd,location.lng);
      
        const caption = await captionModel.findByIdAndUpdate(userId,
          {
            location: {
              ltd: location.ltd,
              lng: location.lng
            },
          },
          {
            new: true
          }
        );
        await caption.save();
      }
      catch(error){
        console.error("Error updating socket ID:", error);
      }
    })
    socket.on("disconnect", () => {
      console.log("Client Disconnected: ", socket.id);
    });
  });
}
const sendMessageToSocketId = (socketId, messageObject) => {
  // console.log(messageObject);
  // console.log(socketId);
      if (io) {
          io.to(socketId).emit(messageObject.event, messageObject.data);
      } else {
          console.log('Socket.io not initialized.');
      }
  }

module.exports = { initilizeSocket, sendMessageToSocketId };
