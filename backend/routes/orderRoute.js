const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../middleware/auth");
const { 
    placeOrder, 
    listOrders, 
    updateStatus, 
    userOrders, 
    verifyOrder 
} = require("../controllers/orderController");

// --- USER ROUTES ---

// 1. Place Order from Frontend
orderRouter.post("/place", authMiddleware, placeOrder);

// 2. Track User Orders
orderRouter.post("/userorders", authMiddleware, userOrders);

// 3. Verify Payment
orderRouter.post("/verify", verifyOrder);


// --- ADMIN ROUTES ---

// 4. List Orders in Admin Panel
orderRouter.get("/list", listOrders);

// 5. Update Order Status in Admin Panel
orderRouter.post("/status", updateStatus);


module.exports = orderRouter;