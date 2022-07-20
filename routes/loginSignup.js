const express = require("express");
const app = express();

const {
  generateToken,
  signupUser,
} = require("../functions/functions");

app.use(express.urlencoded());

app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  // verify username and password generate and send jwt token
  let response = await generateToken(username, password);
  if (typeof response == "object") {
    res.header(response);
    res.json("User logged in successfully");
  } else {
    res.json(response);
  }
});

app.post("/signup", async (req, res) => {
  let { name, username, password } = req.body;
  let response = await signupUser(name, username, password);
  res.json(response);
});

module.exports = { loginSignupRoute: app };
