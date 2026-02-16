import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user_id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSideBar controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id:userToChatId } = req.params.id;
        const userId = req.user_id;

        const messages = await Message.find({
            $or: [
                {senderId:userId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:userId},
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId} = req.params;
        const { senderId } = req.userId;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = newMessage({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}