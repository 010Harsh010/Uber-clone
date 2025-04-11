const {validationResult} = require("express-validator");
const rideService  = require("../services/ride.service.js");
const mapService  = require("../services/map.service.js");
const {sendMessageToSocketId } = require('../socket');
const rideModel = require("../models/ride.model.js")
const mongoose = require('mongoose');
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {  pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        // console.log("pickup Cordinate",pickupCoordinates);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,100000 );
        // console.log("Captain Radius :",captainsInRadius);
        const newCaptaions = captainsInRadius.filter((captain)=> {
            return captain.vehicle.vehicleType ===vehicleType;
        })
        ride.otp = "";
        const rideWithUser = await rideModel.findOne({ _id: new mongoose.Types.ObjectId(ride._id) }).populate('user');
        // console.log(rideWithUser);
        newCaptaions.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports.getFare = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "error": errors.array(),
        })
    }
    try {
        const {pickup,destination} = req.body;
        const response = await rideService.getFare(pickup,destination);
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            "error": error.message
        })
    }
}
module.exports.confirmRide = async(req,res,next)=> {
    const errors = validationResult(req);
    console.log("request conming");
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // console.log("captain id",req.user._id);
        const response = await rideService.confirmride(req.body.rideId,req.user._id);
        sendMessageToSocketId(response.user.socketId,{
            event: 'ride-confirmed',
            data: response
        })
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(400).json({
            "error": err.message
        })
    }
}
module.exports.startride = async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {otp,rideId} = req.body;
    try {
        const response = await rideService.startride(otp,rideId);
        // console.log("ride Stared",response);
        
        return res.status(200).json(response);
    }catch(error){
        res.status(400).json({"error":error.message})
    }
}
module.exports.endride=  async(req,res,next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {rideId}=  req.body;
        const response = await rideService.endride(rideId,req.user._id);
        sendMessageToSocketId(response[0]?.user?.socketId,{
            event: 'ride-ended',
            data: response[0]
        })
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            "error": error.message
        })
    }
}