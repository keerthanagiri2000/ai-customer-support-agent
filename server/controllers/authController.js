import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName && !email && !password) return res.status(400).json({ message: "All fields are required" });
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ userName, email, password: hashPassword });

        await user.save();
        return res.status(201).json({ message:"User registered successfully" })
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
     try {
        const { email, password } = req.body;
        if (!email && !password) return res.status(400).json({ message: "Email and Password required" });
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const compareUser = await bcrypt.compare(password, user.password);
        if (!compareUser) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).json({ message:"Login successfully", token, user: { _id: user._id, userName: user.userName, email: user.email } });
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}