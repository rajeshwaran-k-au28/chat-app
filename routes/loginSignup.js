const express = require("express");
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { authenticateToken } = require("../functions/functions");
app.use(bodyParser.urlencoded());
// app.use(cookieParser())
const {
  generateToken,
  signupUser,
} = require("../functions/functions");

//send loginpage
app.get("/login", (req,res)=>{
  console.log("sending login page..")
  res.sendFile(path.join(__dirname, '..', '/client/signin.html'))
})

app.get("/login", (req,res)=>{
  res.sendFile(path.join(__dirname, "..", "/client/signIn.html"))

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
    // console.log("writing headers..")
    // console.log(response)
    // res.setHeader(response);
    //redirects to dashboard
    res.redirect('/dashboard');
    // res.sendFile(path.join(__dirname, "..", "/client/dashboard.html"));
  } else {
    res.sendFile(path.join(__dirname, '..', '/client/signin.html'))
  }
});

//send dashboard
app.get("/dashboard", authenticateToken, (req,res)=>{
  res.sendFile(path.join(__dirname, "..", "/client/dashboard.html"));
})
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
