const express = require("express");
const app = express();
const { userModel } = require("../models/User");
const { authenticateToken } = require("../functions/functions");
//body parser
app.use(express.json());

app.get("/userid/:userName",authenticateToken, async (req,res)=>{
    let user =  await userModel.findOne({username:req.params.userName})
    let userId = user._id
    res.json(userId)
})
app.get("/users", authenticateToken, async(req,res)=>{
    try {
        let data = await userModel.find({})
        let usernames = data.map((i)=> {return [i.name,i.username,i._id]})
        res.json(usernames)
        
        
    } catch (error) {
        res.sendStatus(500).json(error)
    }
})



module.exports = {userRoute:app}