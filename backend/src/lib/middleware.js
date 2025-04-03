import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "No Token Provided - No Access" })
        }

        const decoded = jwt.verify(token, process.env.JWTSECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token - No Access" })
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in middleware protectRoute", error.message);
        res.status(500).json({ message: "Internal error!" })
    }
}