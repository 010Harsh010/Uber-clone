const captainModel = require("../models/caption.model.js");
const {validationResult } = require("express-validator");
const captainService = require("../services/caption.service.js");
const Blacklist  = require("../models/blacklist.model.js");
const blacklistModel = require("../models/blacklist.model.js");
const rideModel = require("../models/ride.model.js");

module.exports.registerCaption = async (req,res,next) => {
   try {
     const errors = validationResult(req);
     
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
     const { fullname, email, password, vehicle } = req.body;
     
     const isCaptainAlreadyExist = await captainModel.findOne({ email });
 
     if (isCaptainAlreadyExist) {
         return res.status(400).json({ message: 'Captain already exist' });
     }
     const hashedPassword = await captainModel.hashPassword(password);
     const captain = await captainService.createCaptain({
         firstname: fullname.firstname,
         lastname: fullname.lastname,
         email,
         password: hashedPassword,
         color: vehicle.color,
         plate: vehicle.plate,
         capacity: vehicle.capacity,
         vehicleType: vehicle.vehicleType
     });
     const token = captain.generateAuthToken();
     res.status(201).json({ token, captain });
   } catch (error) {
    res.status(500).json({
        "error" : "Iternal Server error"
    })
   }
}
module.exports.loginCaption = async (req,res,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() }); 
    }
    const { email, password } = req.body;
    const caption = await captainModel.findOne({email}).select("+password");
    if (!caption){
        return res.status(404).json({ message: 'Invalid email or password' });
    }
    const ismatch = await caption.comparePassword(password);
    if(!ismatch){
        return res.status(404).json({ message: 'Invalid email or password' });
    }
    caption.password = "";
    const token = caption.generateAuthToken();
    res.cookie("token",token);
    res.status(200).json({token, caption });
}
module.exports.getProfile = async (req,res,next) => {
    res.status(200).json(req.user);
}   
module.exports.logoutCaption = async (req,res,next) => {
    const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];
    await blacklistModel.create({token});
    res.clearCookie('token');
    res.status(200).json({"message" :" Logout Successfull"});
}
module.exports.getearning = async (req, res, next) => {
    try {
        const totalrides = await rideModel.aggregate([
            {
                $match: {
                        "captain": req.user._id ,
                     "status": "completed" 

                }
            },
            {
                $group: {
                    _id: null,
                    totalRides: { $sum: 1 },
                    totalEarn: { $sum: "$fare" }, // Assuming "fare" represents the earnings
                    totalDistance: { $sum: "$distance" },
                    totalTime: {
                        $sum: { $add: ["$duration", 0] }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRides: 1,
                    totalEarn: 1,
                    totalDistance: 1,
                    totalTime: 1
                }
            }
        ]);
        res.status(200).json(totalrides);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
};
