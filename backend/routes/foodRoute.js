const express = require("express");
const foodRouter = express.Router();
const Food = require("../models/Food");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// 1. Ensure 'uploads' directory exists
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

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
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
            image: food.image && (food.image.startsWith("http") 
                ? food.image 
                : `${host}/images/${food.image}`),
        }));
        res.status(200).json({ success: true, data: formattedFoods });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Add Food Item
foodRouter.post("/add", upload.single("image"), async (req, res) => {
    try {
        console.log("--- New Food Request ---");
        console.log("Body:", req.body); 
        console.log("File:", req.file);

        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "Image upload failed! Make sure the field name is 'image'." 
            });
        }
       
        const { name, description, price, category, hotelName, location } = req.body;

        if (!name || !description || !price || !category) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ 
                success: false,
                message: "Missing required food fields."
            });
        }

        const newFood = new Food({
            name,
            description,
            price: Number(price),
            image: req.file.filename,
            category,
            hotelName: hotelName || "YumDash Special",
            location: location || "Chennai"
        });

        await newFood.save();
        res.status(201).json({ success: true, message: "Food added successfully!" });

    } catch (err) {
        console.error("Backend Error Detail:", err);
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ success: false, message: "Database Error", error: err.message });
    }
});

// Remove Food Item
foodRouter.post("/remove", async (req, res) => {
    try {
        const food = await Food.findById(req.body.id);
        if (!food) return res.status(404).json({ success: false, message: "Food item not found" });

        if (food.image) {
            const filePath = path.join(process.cwd(), "uploads", food.image);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await Food.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = foodRouter;