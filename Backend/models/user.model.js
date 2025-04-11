const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt  =  require("jsonwebtoken");

const userSchema = new Schema({
    fullname: { 
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3,"First Name Must be at Least 3 character long"],
        },
        lastname: {
            type: String,
            trim: true,
            minlength: [3,"Last Name Must be at Least 3 character long"],
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        Select: false
    },
    socketId: {
        type: String
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id : this._id
    },process.env.JWT_SECRET,{
        expiresIn: "24h"
    });
    return token;
}
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model("User",userSchema);