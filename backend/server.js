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

// 2. App Configuration
const app = express();
const port = process.env.PORT || 5000;

// 3. Middlewares
app.use(express.json());
app.use(cors());

//  Static Folder for Images
app.use("/images", express.static("uploads"));

// 4. API Endpoints
app.use("/api/user", userRouter); 
app.use("/api/admin", adminRouter); 

// Food Routes
app.use("/api/food", foodRouter); 
app.use("/api/foods", foodRouter); 

// Order Routes
app.use("/api/order", orderRouter);
app.use("/api/orders", orderRouter);

//  Message Route 
app.use("/api/messages", messageRouter); 



// 5. Database Connection
const mongoURI = process.env.MONGODB_URI || "mongodb://anitha:Rxz1mD55RDCqgBro@ac-wcjbguf-shard-00-00.nng3xmm.mongodb.net:27017,ac-wcjbguf-shard-00-01.nng3xmm.mongodb.net:27017,ac-wcjbguf-shard-00-02.nng3xmm.mongodb.net:27017/?ssl=true&replicaSet=atlas-1npgja-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(mongoURI)
.then(() => console.log(" MongoDB Connected Successfully"))
.catch((err) => console.log(" MongoDB Connection Error:", err));

// 6. Root Route (Testing)
app.get("/", (req, res) => {
 res.send(" API is working perfectly!");
});

// 7. Global 404 Handler
app.use((req, res) => {
 res.status(404).json({ success: false, message: "Route Not Found" });
});

// 8. Server Start
app.listen(port, () => {
console.log(` Server is running on http://localhost:${port}`);
});