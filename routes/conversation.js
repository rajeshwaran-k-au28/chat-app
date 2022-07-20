const express = require("express");
const app = express();
//body parser
app.use(express.json());

const { conversationModel } = require("../models/Conversation");
const { authenticateToken } = require("../functions/functions");

//post convo to DB
app.post("/conversation", authenticateToken, async (req, res) => {
  let data = [req.body.senderId, req.body.receieverId];
  let newConvo = new conversationModel({
    members: data,
  });
  try {
    await newConvo.save();
    console.log("Conversation uploaded to DB successfully!");
    res.send("Conversation uploaded to DB successfully!");
  } catch (error) {
    console.log(error);
  }
});
// get convo of specific user
app.get("/conversation/:userid", authenticateToken, async(req,res)=>{
  try {
    console.log("searching for matching convos with given userId..")
    let convo = await conversationModel.find({
      members:{ $in: [req.params.userid]}
    })
    if(convo) console.log("Match found!")
    res.json(convo)
  } catch (error) {
    res.json(error)
  }

})
module.exports = { conversationRoute: app };
