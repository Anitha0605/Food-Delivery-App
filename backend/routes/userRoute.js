const express = require("express");
const userRouter = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");

// 1. Register
userRouter.post("/register", registerUser);

// 2. Login
userRouter.post("/login", loginUser);

module.exports = userRouter;