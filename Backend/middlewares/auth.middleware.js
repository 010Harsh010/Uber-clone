const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const Blacklist = require("../models/blacklist.model.js");
const captainModel = require("../models/caption.model.js");

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization?.split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        const blacklisted = await Blacklist.findOne({
            token:token
        })
        if(blacklisted){
            return res.status(401).json({ message: "Unauthorized - Token blacklisted" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(401).json({ message: "Unauthorized request" });
    }
};
module.exports.authCaption = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization?.split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        const blacklisted = await Blacklist.findOne({
            token:token
        })
        if(blacklisted){
            return res.status(401).json({ message: "Unauthorized - Token blacklisted" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await captainModel.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(401).json({ message: "Unauthorized request" });
    }
};
