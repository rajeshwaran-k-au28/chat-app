const express = require("express");
const app = express();
//body parser
app.use(express.json());

const { conversationModel } = require("../models/Conversation");
const { authenticateToken } = require("../functions/functions");
const { messageModel } = require("../models/Message");

//post convo to DB and send conversation id
app.post("/conversation",authenticateToken, async (req, res) => {
  //search in db to check if conversation exist
  let data = [req.body.senderId, req.body.receieverId ];
  // console.log(data)
  try {
    let oldConvo = await conversationModel.findOne({data});
    // console.log(oldConvo)
    if (oldConvo) {
      let convoId = oldConvo._id;
      let messages = await messageModel.find({conversationId:convoId});
      // console.log(convoId)
      return res.json({ convoId, messages });
    }
    let newConvo = new conversationModel({
      members: data,
    });
    await newConvo.save();
    console.log("Conversation uploaded to DB successfully!");
    //sends conversation id
    return res.json(newConvo._id);
  } catch (error) {
    console.log(error);
  }
});

// get convo of specific user
app.get("/conversation/:userid", authenticateToken, async (req, res) => {
  try {
    console.log("searching for matching convos with given userId..");
    let convo = await conversationModel.find({
      members: { $in: [req.params.userid] },
    });
    if (convo) console.log("Match found!");
    res.json(convo);
  } catch (error) {
    res.json(error);
  }
});
module.exports = { conversationRoute: app };
