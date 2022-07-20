const express = require("express");
const app = express();
//body parser
app.use(express.json());

app.post('/')

const { messagesModel } = require("../models/Message");