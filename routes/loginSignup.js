const express = require("express");
const app = express();

const {
  connectToDb,
  authenticateToken,
  generateToken,
  signupUser,
} = require("../functions/functions");

app.use(express.urlencoded());

app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  // verify username and password generate and send jwt token
  let response = await generateToken(username, password);
  res.header(response)
  res.send("User logged in successfully.")
});

app.post("/signup", async (req, res) => {
  let { name, username, password } = req.body;
  let response = await signupUser(name, username, password);
  res.send(response);
});

module.exports = { loginSignupRoute: app };
