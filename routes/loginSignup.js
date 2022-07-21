const express = require("express");
const app = express();
const path = require("path")
const {
  generateToken,
  signupUser,
} = require("../functions/functions");

app.use(express.urlencoded());

app.get("/login", (req,res)=>{
  res.sendFile(path.join(__dirname, "..", "/client/signIn.html"))

})

app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  console.log(req.body)
  // verify username and password generate and send jwt token
  let response = await generateToken(username, password);
  if (typeof response == "object") {
    res.header(response);
    res.json("User logged in successfully");
  } else {
    res.json(response);
  }
});

app.get("/signup", (req,res) =>{
  console.log("inside get route signup")
  res.sendFile(path.join(__dirname,"..","/client/signUp.html"))

})
app.post("/signup", async (req, res) => {
  let { name, username, password, email } = req.body;
  let response = await signupUser(name, username, password, email);
  res.json(response);
});

module.exports = { loginSignupRoute: app };
