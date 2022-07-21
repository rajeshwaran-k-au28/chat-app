require("dotenv").config();
const { loginSignupRoute } = require("./routes/loginSignup");
const { conversationRoute } = require("./routes/conversation");
const { messagesRoute } = require("./routes/message");
const { connectToDb } = require("./functions/functions");
const { userRoute } = require("./routes/user");
const path = require("path")
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname , "/client")))
//connectiong to mongoDB
connectToDb();

//routes
app.use(loginSignupRoute, conversationRoute, messagesRoute, userRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
