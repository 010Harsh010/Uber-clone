const rideModel = require("../models/ride.model.js")
const mapService = require("../services/map.service.js");
const crypto = require("crypto");
const mongoose = require('mongoose');
const { sendMessageToSocketId } = require("../socket.js");

function getotp (num){
    function generateOTP(num){
        const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp;
    }
    return generateOTP(num);
}
async function getFare(pickup,destination) {
    if (!pickup || !destination){
        throw new Error("Pickup and Destination are require");
    }
    
    const distanceTime = await mapService.getDistanceAndTime(pickup, destination);
    // console.log(distanceTime);
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };
    // console.log(fare);
    
    return {"fare":fare,"text":distanceTime.distance.value,"duration":distanceTime.duration.value};
}
module.exports.createRide= async({
    user,pickup,destination,vehicleType
}) => {
    try {
        if (!user || !pickup || !destination || !vehicleType){
            throw new Error("All Fields Are Require");
        }
        const fare = await getFare(pickup,destination); 
        const distance = fare.text;
        const duration = fare.duration;

        const ride =await rideModel.create({
            user:user,
            pickup:pickup,
            destination:destination,
            fare: fare.fare[vehicleType],
            otp: getotp(6),
            distance: Number(distance),
            duration: Number(duration),
        });
        console.log("ride created", ride);
        await ride.save()
        return ride;
    } catch (error) {
        throw error;
        
    }
}
module.exports.getFare = getFare;

module.exports.confirmride = async(rideId,captainId)=>{
    try {
        if (!rideId || !captainId){
            throw new Error("All Field Required");
        }
        // console.log("inside service",rideId);
        const updateddata = await rideModel.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(rideId)
        },{
            status: 'accepted',
            captain: captainId
        },
        {
            new: true
        }
    );
        await updateddata.save();
        // console.log("midddle service",updateddata);
        
        const ride = await rideModel.findById(new mongoose.Types.ObjectId(rideId)).populate('captain').populate('user').select("+otp");
        // if (!ride){
        //     throw new Error("Unable to find Ride");
        // }
        // console.log("ending service",ride);
        return ride;
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports.startride = async(otp,rideId)=>{
    try {
        if (!otp || !rideId){
            throw new Error("OTP require");
        }
        const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');
        if (!ride){
            throw new Error("Unable to find Ride");
        }
        if (ride.status!=="accepted" ){
            throw new Error("Ride Not Accepted");
        }
        if (ride.status==="ongoing"){
            throw new Error("Ride Already Started");
        }
        if (ride.otp !== otp){
            throw new Error("Invalid OTP");
        }
        const newride = await rideModel.findByIdAndUpdate({
            _id: ride._id
        },
        {
            status: "ongoing"
        },{
            new: true
        });
        await newride.save();
        console.log("ride started",newride);
        sendMessageToSocketId(ride.user.socketId,{
            event: "ride-started",
            data: newride
        })
        return ride;
    }   
    catch(error){
        throw new Error(error.message);
    }
}
module.exports.endride = async(rideId,captainId)=>{
    try {
        const ride = await rideModel.find({
            _id: rideId,
            captain: captainId
        }).populate('user').populate('captain');
        // console.log("completed ride",ride);
        
        if (!ride){
            throw new Error("No ride Found");
        }
        // if (ride.status!=="ongoing"){
        //     throw new Error("Ride Not Ongoing");
        // }
        await rideModel.findByIdAndUpdate({_id:rideId},{
            status: "completed",
        })
        return ride;
    }catch(error){
        throw new Error(error.message);
    }
}