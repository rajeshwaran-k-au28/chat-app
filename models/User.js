const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    hash:{
        type:String,
        required:true
    }
}) 

const userModel = mongoose.model("users", userSchema);

module.exports = {userModel}