const orderModel = require("../models/Order");
const userModel = require("../models/User");

// 1. Placing User Order from Frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId, 
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address, // Object: {firstName, street, city, etc.}
        });

        await newOrder.save();
        
       
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ 
            success: true, 
            message: "Order Placed Successfully", 
            orderId: newOrder._id 
        });
    } catch (error) {
        console.log("Place Order Error:", error);
        res.json({ success: false, message: "Error Placing Order" });
    }
};

// 2. Listing Orders for Admin Panel

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("List Orders Error:", error);
        res.json({ success: false, message: "Error Fetching Orders" });
    }
};

// 3. Updating Order Status from Admin Panel

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { 
            status: req.body.status 
        });
        res.json({ success: true, message: "Status Updated Successfully" });
    } catch (error) {
        console.log("Update Status Error:", error);
        res.json({ success: false, message: "Error Updating Status" });
    }
};

// 4. User Orders for Frontend "My Orders" Page
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("User Orders Error:", error);
        res.json({ success: false, message: "Error Fetching User Orders" });
    }
};

// 5. Verify Order (Optional - Payment Verification)
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Verified" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log("Verify Order Error:", error);
        res.json({ success: false, message: "Error Verifying Payment" });
    }
};

module.exports = { 
    placeOrder, 
    listOrders, 
    updateStatus, 
    userOrders, 
    verifyOrder 
};