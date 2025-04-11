const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain",
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending","ongoing", "accepted", "rejected", "completed"],
        default: "pending",
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },
    otp: {
        type: String,
        select: false,
        required: true,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
});
module.exports =  mongoose.model('ride',rideSchema);