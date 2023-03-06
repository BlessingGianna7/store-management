const express = require('express');
const app = express.Router()

const {createUser,login,getProfile} = require("../controllers/user.controller")

app.post("/users/register", createUser)
app.post("/users/login", login)
app.get("/users/profile",getProfile)
module.exports = app