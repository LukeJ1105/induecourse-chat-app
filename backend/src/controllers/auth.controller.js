import cloudinary from "../lib/cloudinary.js";
import { genToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const passwordAuth = await bcrypt.compare(password, user.password)
        if (!passwordAuth) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        genToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            displayName: user.displayName,
            profileImage: user.profileImage
        })
    } catch (error) {
        console.log("Login in controller error", error.message);
        return res.status(500).json('Internal Error')
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Successfully logged out!" })
    } catch (error) {
        console.log("Logout controller error", error.message);
        res.satus(500).json({ message: 'Internal Error!' })
    }
}

export const signup = async (req, res) => {
    const { displayName, fullName, password, email, profileImage } = req.body;
    try {
        if (!fullName || !password || !email || !displayName) {
            return res.status(400).json({ message: "All Fields required!" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be a minimum of 8 characters" })
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists!" });
        const disName = await User.findOne({ displayName });
        if (disName) return res.status(400).json({ message: "Display name taken!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            displayName,
            profileImage,
            password: hashedPassword
        });

        if (newUser) {

            genToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                displayName: newUser.displayName,
                email: newUser.email,
                profileImage: newUser.profileImage,
            })

        } else {
            return res.status(400).json({ message: "Failed to create User!" })
        }

    } catch (error) {

        console.log("Signup controller error", error.message)
        res.status(500).json({ message: "Internal error!" })

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profileImage } = req.body;
        const userId = req.user._id;
        console.log(process.env.CLOUDINARY_CLOUD_NAME)
        if (!profileImage) {
            return res.status(400).json({ message: "Profile Image Required" })
        }
        const uploadRes = await cloudinary.uploader.upload(profileImage);
        const updateUser = await User.findByIdAndUpdate(userId, { profileImage: uploadRes.secure_url }, { new: true });
        return res.status(200).json(updateUser);
    } catch (error) {
        console.log("Error in upProfile controller", error.message);
        return res.status(500).json({message: "Internal Error!"})
    }
}

export const checkAuth = (req, res) =>{
    try{
        res.status(200).json(req.user)
    }catch(error){
        console.log("Erorr in checkAuth Controller", error.message);
        res.status(500).json({message: "Internal Error"})
    }
}