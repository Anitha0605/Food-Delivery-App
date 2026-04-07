const Food = require("../models/Food"); 
const fs = require("fs");

// 1. List Food
const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food list" });
    }
};

// 2. Add Food
const addFood = async (req, res) => {
    try {
        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image, 
            hotelName: req.body.hotelName,
            location: req.body.location
        });

        await food.save();
        res.json({ success: true, message: "Food Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food" });
    }
};

// 3. Remove Food
const removeFood = async (req, res) => {
    try {
        const food = await Food.findById(req.body.id);
        // fs.unlink(`uploads/${food.image}`, () => {});

        await Food.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food" });
    }
};

module.exports = { addFood, listFood, removeFood };