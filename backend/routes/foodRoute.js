const express = require("express");
const foodRouter = express.Router();
const Food = require("../models/Food");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// 1. Ensure 'uploads' directory exists (using absolute path for stability)
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

// --- ROUTES ---

// List Food Items
foodRouter.get("/list", async (req, res) => {
    try {
        const foods = await Food.find({});
        const host = `${req.protocol}://${req.get("host")}`;
        const formattedFoods = foods.map(food => ({
            ...food._doc,
            image: food.image && food.image.startsWith("http")
                ? food.image
                : `${host}/images/${food.image}`,
        }));
        res.status(200).json({ success: true, data: formattedFoods });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Add Food Item
foodRouter.post("/add", upload.single("image"), async (req, res) => {
    try {
        // Log setup for Render monitoring
        console.log("--- New Food Request ---");
        console.log("Body:", req.body); 
        console.log("File:", req.file);

        // Validation
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image upload failed! Make sure the image field is included." });
        }
       
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
            return res.status(400).json({ 
                success: false,
                message: "Missing required food fields: name, description, price, or category."
            });
        }

        const newFood = new Food({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            image: req.file.filename,
            category: req.body.category,
            hotelName: req.body.hotelName || "YumDash Special",
            location: req.body.location || "Chennai"
        });

        await newFood.save();
        res.status(201).json({ success: true, message: "Food added successfully!" });

    } catch (err) {
        console.error("Backend Error Detail:", err);
        res.status(500).json({ success: false, message: "Database Error", error: err.message });
    }
});

// Remove Food Item
foodRouter.post("/remove", async (req, res) => {
    try {
        const food = await Food.findById(req.body.id);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Correct File Deletion Logic
        if (food.image) {
            const filePath = path.join(process.cwd(), "uploads", food.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Food.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.error("Remove Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = foodRouter;