const Food = require("../models/Food");
const fs = require("fs");

// 1. List Food
const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("List Food Error:", error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};

// 2. Add Food 
const addFood = async (req, res) => {
    try {
        // Step 1: Check if image was uploaded by Multer
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "Image upload failed! Make sure the image field is included." 
            });
        }

        // Step 2: Extract data from req.body (Destructuring)
        const { name, description, price, category, hotelName, location } = req.body;

        // Step 3: Create new Food item
        const food = new Food({
            name,
            description,
            price: Number(price), // String-ah vandha Number-ah mathirum
            category,
            image: req.file.filename,
            hotelName,
            location
        });

        // Step 4: Save to Database
        await food.save();
        res.status(201).json({ success: true, message: "Food Added Successfully" });

    } catch (error) {
        console.error("Add Food Error:", error);
        
        // Error vandha upload aana image-ai delete pannidalaam (to keep folder clean)
        if (req.file) {
            fs.unlink(`uploads/${req.file.filename}`, () => {});
        }

        res.status(400).json({ 
            success: false, 
            message: "Error adding food", 
            error: error.message 
        });
    }
};

// 3. Remove Food
const removeFood = async (req, res) => {
    try {
        const { id } = req.body; // Frontend-la irundhu vara 'id'
        
        const food = await Food.findById(id);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Image-ai uploads folder-la irundhu delete pannuvom
        if (food.image) {
            const imagePath = `uploads/${food.image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) console.error("Image delete error:", err);
                });
            }
        }

        await Food.findByIdAndDelete(id);
        res.json({ success: true, message: "Food Removed Successfully" });

    } catch (error) {
        console.error("Remove Food Error:", error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

module.exports = { addFood, listFood, removeFood };