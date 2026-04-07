const express = require("express");
const adminRouter = express.Router();
const { adminLogin } = require("../controllers/adminController");


// URL: http://localhost:5000/api/admin/login
adminRouter.post("/login", adminLogin);

module.exports = adminRouter;