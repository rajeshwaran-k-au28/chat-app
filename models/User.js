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
//static function to check email before creating user model
userSchema.statics.isEmailDuplicate = async function(email) {
    try {
        let userExist = await this.findOne({email})
        if(userExist) return false
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}
const userModel = mongoose.model("users", userSchema);

module.exports = {userModel}