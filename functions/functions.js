require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { userModel } = require("../models/User");
var cl = console.log;

//helper functions
async function connectToDb() {
  try {
    cl("Connecting to database..");
    await mongoose.connect(process.env.mongoUri);
    cl("Connection successfull!");
    return "Connection successfull!";
  } catch (error) {
    cl(error);
    return error;
  }
}
function hashPassword(password) {
  cl("Hashing user password...");
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  cl("Password hash successfull!");
  return hash;
}

//main functions
//jwt authentication function
function authenticateToken(req, res, next) {
  // cl(req.cookies)
  cl("Authenticating JWT token..");
  let token = req.cookies.jwttoken
  if (!token) {
    res.redirect("/login")}
  jwt.verify(token, process.env.signature, (err, decodedToken) => {
    if (err) {
      res.redirect("/login")
    }
    cl("Authentication successful!");
    next();
  });
}
//handles LOGIN -> verify username, password and generate jwt token
async function generateToken(username, password) {
  // await connectToDb()
  try {
    cl("Finding matching account..");
    let userInfo = await userModel.findOne({ username: username });
    if (userInfo) {
      //checking user entered password with hash from DB
      let verified = bcrypt.compareSync(password, userInfo.hash);
      if (userInfo.username == username && verified) {
        let payload = { username: username, isLogged: true };
        let token = jwt.sign(payload, process.env.signature, {
          algorithm: "HS384",
          expiresIn: "1d",
        });
        let response = {
          jwtToken: token,
          message: "Authentication successfull",
        };
        cl(`user "${username}" is authenticated succesfully!`);
        return response;
      } else {
        cl("Invalid Password.");
        return "Invalid username or password";
      }
    } else {
      cl("Username not matching.");
      return "User Not Found, please signup.";
    }
  } catch (error) {
    return error;
  }
}

// add new user (signup)
async function signupUser(name, username, password, email) {
  // await connectToDb()
  let hash = hashPassword(password);
  let newUser = new userModel({
    name: name,
    username: username,
    email:email,
    hash: hash
  
  });
  try {
    cl("Adding new user..");
    await newUser.save();
    cl(`${name} user has been created successfully`);
    return `${name} user has been created successfully`;
  } catch (error) {
    cl(error);
    return error;
  }
}

module.exports = { connectToDb, authenticateToken, generateToken, signupUser };
