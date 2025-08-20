const db = require('../models/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if email already exists
        const checkUserSql = "SELECT * FROM users WHERE email = ?";
        db.query(checkUserSql, [email], (err, result) => {
            if (err) {
                console.log("DB Error");
                return res.status(500).json({ message: "Database error" });
            };
            if (result.length > 0) {
                return res.status(400).json({ message: "Email already registered" })
            };
        })

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into DB
        const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(insertSql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            return res.status(200).json({ success: true, message: "User registered successfully", userId: result.insertId });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], async (err, result) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (result.length === 0) {
                return res.status(400).json({ success: false, message: "Invalid email or password" });
            }
            const user = result[0];

            if (!user.password) {
                return res.status(500).json({ success: false, message: "Password not found in DB" });
            }
            //compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Invalid email or password" });
            }
            res.status(200).json({
                success: true,
                message: "Login successful",
                user: { id: user.id, name: user.name, email: user.email }
            })
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = {
    registerUser,
    loginUser,
};