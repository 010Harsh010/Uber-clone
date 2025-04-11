const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rideId :{
        type: Schema.Types.ObjectId,
        ref: 'ride',
        require: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    capatinId: {
        type: Schema.Types.ObjectId,
        ref: 'captain',
        require: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        require: true 
    },
    review: {
        type: String,
        default: ""
    }
})

const reviewModel = new mongoose.model("review",reviewSchema);
module.exports=reviewModel;