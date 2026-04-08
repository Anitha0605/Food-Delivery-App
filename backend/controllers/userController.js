const User = require("../models/User"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Token Creation
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "secret_key");
}

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ 
            success: true, 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role || "user" 
            } 
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.json({ success: false, message: "Error in Login" });
    }
}

//Register
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user" 
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        
        res.json({ 
            success: true, 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            } 
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.json({ success: false, message: "Error in Registration" });
    }
}

module.exports = { loginUser, registerUser };