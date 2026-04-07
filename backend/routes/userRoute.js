const express = require("express");
const userRouter = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");

// 1. Register
// Endpoint: http://localhost:5000/api/user/register
userRouter.post("/register", registerUser);

// 2. Login
// Endpoint: http://localhost:5000/api/user/login
userRouter.post("/login", loginUser);

module.exports = userRouter;