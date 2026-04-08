const userModel = require("../models/User");
// கார்ட்டில் சேர்க்க (Add to cart)
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        res.json({ success: false, message: "Error adding to cart" });
    }
};

// கார்ட்டில் இருந்து நீக்க (Remove)
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        res.json({ success: false, message: "Error removing from cart" });
    }
};

// கார்ட் டேட்டாவைப் பெற (Get Cart - 404 எரர் வரும் இடம்)
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        res.json({ success: false, message: "Error fetching cart" });
    }
};

// மிக முக்கியம்: இதைக் கடைசியில் சரியாகக் கொடுக்கவும்
module.exports = { addToCart, removeFromCart, getCart };