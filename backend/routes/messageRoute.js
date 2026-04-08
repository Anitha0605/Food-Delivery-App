const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST: Send a Message
router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Your message has been sent successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

// GET: (Admin Panel - List All Messages)
router.get("/all", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;