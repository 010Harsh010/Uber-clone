const mongoose = require("mongoose");

async function connectToDb() {
    await mongoose.connect(process.env.DB_CONNECT)
    .then((data) => {        
        console.log("Connected to MongoDB");
    })
    .catch(err=>{
        console.log(err);
    });
}

module.exports = connectToDb;