import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserSideBar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUserSideBar controller", error.message);
        res.status(500).json({ message: "Internal Error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: reqUser } = req.params;
        const currentUser = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: currentUser, receiverId: reqUser },
                { senderId: reqUser, receiverId: currentUser }
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({message: "internal Error"})
    }
}

export const sendMessage = async (req, res) =>{
    try {
        const {text, image} = req.body;
        const {id: reqUser} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId: reqUser,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //realtime with socket.io
        const receiverSocketId = getReceiverSocketId(reqUser);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({message: "Internal Error!"});
    }
}