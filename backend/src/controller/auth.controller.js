import { generateToken } from "../lib/utils.js"
import User from "../model/User.js"
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    const name = typeof fullName === "string" ? fullName.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim() : "";
    const pass = typeof password === "string" ? password : "";
    try {
        // Validation
        if (!name || !normalizedEmail || !pass) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (pass.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        // Check existing user
        const user = await User.findOne({ email: normalizedEmail });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);

        // Create user
        const newUser = new User({
            fullName: name,
            email: normalizedEmail,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate token AFTER save
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.log("Error in signup controller:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};