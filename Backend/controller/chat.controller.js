const chatModel = require("../models/chat.model.js");
const {sendMessageToSocketId} = require("../socket.js");
const captainModel = require("../models/caption.model.js");
const userModel = require("../models/user.model.js");

module.exports.sendchat = async(req,res,next) => {
    try {
        const { message, sender, receiver  } = req.body;
        let reciving ;
        if (receiver.type==="captain"){
            reciving = await captainModel.findById({
                _id: receiver._id
            });
        }else{
            reciving = await userModel.findById({
                _id: receiver._id
            })
        }
        if (!reciving){
            throw new Error("No Reciver Found");
        }
        // const chat = await chatModel.findByIdAndUpdate(
        //     { _id: chatId },
        //     {
        //         $push: {
        //             chats: {
        //                 message: message,
        //                 timestamp: new Date(),
        //                 sender: sender.type,
        //                 receiver: receiver.type,
        //             },
        //         },
        //     },
        //     { new: true } // Returns the updated document
        // );
        sendMessageToSocketId(reciving.socketId,{
            event: "recive-message",
            data: {
                message: message,
                timestamp: new Date(),
                sender: sender.type,
                reciver: receiver.type
            }
        })
        sendMessageToSocketId(req.user.socketId,{
            event: "recive-message",
            data: {
                message: message,
                timestamp: new Date(),
                sender: sender.type,
                reciver: receiver.type
            }
        })
        return res.status(200).json({
            message: "Message Sent Successfully",
        })
    }catch(err){
        console.log(err.message);
        return res.status(404).json({
            message: err.message
        })
    }
}
module.exports.createChat = async(req,res,next) =>{
    try {
        const { ride } = req.body;
        const isexist = await chatModel.findOne({
            ride: ride._id
        });
        if (isexist){
            return res.status(200).json({
                message: "Chat Already Exist",
            });
        }
        const chats = await chatModel.create({
            user: ride.user,
            captain: ride.captain,
            rideId: ride._id
        })
        return res.status(200).json({
            message: "Chat Created Successfully",
            data: chats
        })
    }
    catch(err){
        return res.status(200).json({
            message: err.message,
            data: null
        })
    }
}