const userModel = require("../models/user.model.js");

module.exports.createUser = async ({firstname,lastname,email,password}) => {
    if (!firstname || !email || !password){
        throw new Error("All fields are require");
    }
    const user = new userModel({
        fullname: {
            firstname:firstname,
            lastname:lastname
        },
        email:email,
        password:password
    });
    if (!user) {
        throw new Error("Unable to create User");
    }
    return user;
}