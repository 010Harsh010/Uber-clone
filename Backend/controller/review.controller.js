const reviewModel = require("../models/review.model.js");
module.exports.createreview = async (req,res,next) => {
    try {
        const {rideId,captainId,review,rating} = req.body;
        if (!rideId|| !captainId || !review || !rating) {
            throw new Error("All fiels are require");
        }
        const reviewData = await reviewModel.create({
            rideId,captainId,review,rating,userId:req.user._id
        });
        if (!reviewData){
            throw new Error("Techinical error");
        }
        return res.status(200).json({
            message:"Review created successfully",
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}