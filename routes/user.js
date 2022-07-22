const express = require("express");
const app = express();
const mongoose = require('mongoose')
const { userModel } = require("../models/User");
const { authenticateToken } = require("../functions/functions");
//body parser
app.use(express.json());
app.get("/user/:userid", authenticateToken, async (req,res)=>{
    try {
        let data =  await userModel.find()
        let userid =req.params.userid
        console.log("userid:",userid.length)
        let filteredData = []
        data.forEach( eachObject=>{if(eachObject._id.toString() != userid) {
            console.log(eachObject._id.toString().length);
            // let username = eachObject.username
            filteredData.push([eachObject.name,eachObject.username, eachObject._id.toString()])
        }})
        console.log(filteredData)
        res.json(filteredData)
        
    } catch (error) {
        res.sendStatus(500).json(error)
    }
})
// app.get("/users", async(req,res)=>{
//     try {
//         console.log("getting all users..");
//         let data = await userModel.find({})
//         console.log(data)
//         let usernames = data.map((i)=> { return [i.name,i.username,i._id]})
//         res.json(usernames)
//     } catch (error) {
//         res.sendStatus(500).json(error)
//     }
// })



module.exports = {userRoute:app}