import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });
    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token missing from header" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
}