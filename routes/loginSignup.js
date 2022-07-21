const express = require("express");
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded());
app.use(cookieParser())
const {
  generateToken,
  signupUser,
} = require("../functions/functions");

//send loginpage
app.get("/login", (req,res)=>{
  console.log("sending login page..")
  res.sendFile(path.join(__dirname, '..', '/public/login.html'))
})

app.post("/login", async (req, res) => {
  console.log("verifying username and password..")
  let { username, password } = req.body;
  console.log(req.body);
  // verify username and password generate and send jwt token
  let response = await generateToken(username, password);
  // let strigifiedToken = JSON.stringify(response.jwtToken)
  if (typeof response == "object") {
    res.cookie("jwttoken", response.jwtToken, {
      httpOnly: false  
    })
    res.header(response);
    res.sendFile(path.join(__dirname, "..", "/public/dashboard.html"));
  } else {
    res.json(response);
  }
});

//testing jwt for fetch
// app.post("/loginfetch", async (req, res) => {
//   let { username, password } = req.body;
//   console.log(req.body);
//   // verify username and password generate and send jwt token
//   let response = await generateToken(username, password);
//   if (typeof response == "object") {
//     res.json(response)
//   } else {
//     res.json(response);
//   }
// });

app.post("/signup", async (req, res) => {
  let { name, username, password } = req.body;
  let response = await signupUser(name, username, password);
  res.json(response);
});

module.exports = { loginSignupRoute: app };
