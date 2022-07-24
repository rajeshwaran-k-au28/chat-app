require("dotenv").config();
const { loginSignupRoute } = require("./routes/loginSignup");
const { conversationRoute } = require("./routes/conversation");
const { messagesRoute } = require("./routes/message");
const { connectToDb } = require("./functions/functions");
const { userRoute } = require("./routes/user");
const path = require("path")
const express = require("express");
const app = express();

// socket server
const server = require("http").createServer(app)
const socketio = require("socket.io")
const io = socketio(server)

const onlineUsersId = {};
const onlineUsersSocketId = {}
io.on("connection", (socket)=>{
  socket.on("login", (data)=>{
    onlineUsersId[data.onlineUser] =socket.id
    onlineUsersSocketId[socket.id] = data.onlineUser
    console.log(onlineUsersId, onlineUsersSocketId)
  })
  socket.on("privateMessage", (data)=>{
    let senderId = onlineUsersSocketId[socket.id]
    let recieverUserId =  onlineUsersId[data.receieverId]
    if(recieverUserId){
      console.log(recieverUserId,senderId);
      socket.to(recieverUserId).emit("newMessage", {senderId:senderId, 
        message:data.message}) 
    }
  })
})

app.use(express.static(path.join(__dirname , "/client")))
//connectiong to mongoDB
connectToDb();
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// //routes
// app.use(express.static(path.join(__dirname, "/public")))
app.use(loginSignupRoute, conversationRoute, messagesRoute, userRoute);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
