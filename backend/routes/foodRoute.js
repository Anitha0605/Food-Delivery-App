const express = require("express");
const foodRouter = express.Router();
const Food = require("../models/Food");

// 1.Get All Foods
// URL: http://localhost:5000/api/food/list
foodRouter.get("/list", async (req, res) => {
    try {
        const foods = await Food.find({});
        res.status(200).json({
            success: true,
            count: foods.length,
            data: foods
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching food list!",
            error: err.message
        });
    }
});

// 2. Add New Food
// URL: http://localhost:5000/api/food/add
foodRouter.post("/add", async (req, res) => {
    try {
        const newFood = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            hotelName: req.body.hotelName || "YumDash Special", // Default value if empty
            location: req.body.location || "Chennai",         // Default value if empty
            available: req.body.available !== undefined ? req.body.available : true
        });

        const savedFood = await newFood.save();
        res.status(201).json({
            success: true,
            message: "Food added successfully!",
            data: savedFood
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Error adding food!",
            error: err.message
        });
    }
});

// 3. Bulk Add Foods (Admin Panel)
// URL: http://localhost:5000/api/food/bulk-add
foodRouter.post("/bulk-add", async (req, res) => {
    try {
       
        const foods = await Food.insertMany(req.body);
        res.status(201).json({
            success: true,
            message: `${foods.length} foods added successfully!`,
            count: foods.length
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in bulk adding foods!",
            error: err.message
        });
    }
});

// 4. Remove Food
// URL: http://localhost:5000/api/food/remove
foodRouter.post("/remove", async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found!" });
        }
        res.json({ success: true, message: "Food removed successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing food!", error: error.message });
    }
});

module.exports = foodRouter;