const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    captain: {
        type: Schema.Types.ObjectId,
        ref: 'captain',
    },
    rideId: {
        type: Schema.Types.ObjectId,
        ref: 'ride',
        unique: true,
    },
    chat: {
        type: Array,
        default: [],
    }
});
const Chat = new mongoose.model('Chat',chatSchema);
module.exports = Chat;