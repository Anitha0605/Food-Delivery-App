const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// 1. Routes 
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");
const foodRouter = require("./routes/foodRoute");
const orderRouter = require("./routes/orderRoute");
const messageRouter = require("./routes/messageRoute"); 
const cartRouter = require("./routes/cartRoute"); 

// 2. App Configuration
const app = express();
const port = process.env.PORT || 5000;

// 3. Middlewares
app.use(express.json());

// --- CORS Configuration ---
app.use(cors({
    origin: [
        "https://food-delivery-app-inky-xi.vercel.app", 
        "http://localhost:5173", 
        "http://localhost:5174"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// --- Static Files for Food Images ---
app.use("/images", express.static(path.join(__dirname, "uploads")));

// 4. API Endpoints 
app.use("/api/user", userRouter); 
app.use("/api/admin", adminRouter); 
app.use("/api/food", foodRouter); 
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/messages", messageRouter); 

// 5. Database Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log(" MongoDB Connected Successfully"))
    .catch((err) => console.log(" MongoDB Connection Error:", err));

// 6. Root Route 
app.get("/", (req, res) => {
    res.send(" API is working perfectly!");
});

// 7. Global 404 Handler 
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route Not Found - Check your endpoint" });
});

// 8. Server Start
app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
});