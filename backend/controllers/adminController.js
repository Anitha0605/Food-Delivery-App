const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Admin details
        const adminEmail = "admin@yumdash.com";
        const adminPassword = "admin123";

        // Email and password validation
        if (email === adminEmail && password === adminPassword) {
            
            // JWT Token
            const token = jwt.sign(
                { email: adminEmail, role: "admin" }, 
                process.env.JWT_SECRET || "secret_key",
                { expiresIn: "1d" }
            );

            return res.json({ 
                success: true, 
                message: "Admin Login Success!",
                token 
            });
        } else {
            return res.json({ 
                success: false, 
                message: "Invalid Admin Credentials! " 
            });
        }
    } catch (error) {
        console.error("Admin Login Error:", error);
        res.json({ success: false, message: "Server Error" });
    }
}

module.exports = { adminLogin };