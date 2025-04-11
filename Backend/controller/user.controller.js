const userModel = require("../models/user.model.js");
const {validationResult}  = require("express-validator");
const userService = require("../services/user.service.js");
const Blacklist = require("../models/blacklist.model.js");
const rideModel = require("../models/ride.model.js");

module.exports.registerUser = async (req,res,next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname,email,password} = req.body;
    console.log(fullname);
    const existuser = await userModel.findOne({email});
    if(existuser){
        return res.status(400).json({message:"Email already exists"})
    }
    const hashedPassword= await userModel.hashPassword(password);

    const user= await userService.createUser({
        firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashedPassword
    });
    user.save();
    const token = user.generateAuthToken();
    res.status(201).json({user,token});
}
module.exports.loginUser = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:"Invalid Email and Password"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid Email and Password"});
    }
    const token = user.generateAuthToken();
    user.password="";
    console.log(user);
    res.cookie('token',token); 
    res.status(200).json({token,user});
}
module.exports.getUserProfile = async (req,res,next) => {
    return res.status(200).json(req.user);
}
module.exports.logout = async (req,res,next) => {
    const token = req.cookies.token;
    await Blacklist.create({token})
    res.clearCookie('token');
    return res.status(200).json({message:"Logged out successfully"});
}
module.exports.getdata = async (req,res,next) => {
    const response = await rideModel.aggregate([
        {
            $match:{
                user: req.user._id
            }
        },{
            $lookup:{
                from: "captains",
                localField: "captain",
                foreignField: "_id",
                as: "captain",
                pipeline: [
                    {
                        $project:{
                            _id:1,fullname:1,email:1,"vehicle.plate":1
                        }
                    }
                ]
            }
        },{
            $unwind:{
                path: "$captain",
            }
        },
    ]);
    res.status(200).json(response);
}