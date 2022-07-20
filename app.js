require("dotenv").config();
const { loginSignupRoute } = require("./routes/loginSignup");
const { conversationRoute } = require("./routes/conversation");
const { connectToDb } = require("./functions/functions");
const express = require("express");
const app = express();

//connectiong to mongoDB
connectToDb();

app.use(loginSignupRoute, conversationRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
