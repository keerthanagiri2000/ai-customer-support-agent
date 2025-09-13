import Chat from "../models/chat.js";
import User from "../models/user.js";
import { getAIResponse } from "../services/aiService.js";

export const sendMessage = async (req, res) => {
    try {
        const userId = req.user.id;

        const { message } = req.body;
        if (!message) return res.status(400).json({ message: "Message required" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const userRequest = await Chat.create({ userId, message: message, role: "user" })

        const aiContent = await getAIResponse([{ role: "user", content: message }]);

        if (aiContent && aiContent.content) {
            const aiResponse = await Chat.create({ userId, message: aiContent.content, role: "ai" });
            return res.status(200).json({ userRequest, aiResponse });
        }

        return res.status(400).json({
            message: "Sorry, I'm having trouble connecting to the AI service. Please try again later."
        })
    } catch (error) {
        return res.status(500).json({ message: "Sorry, I'm having trouble connecting to the AI service. Please try again later." });
    }
}

export const history = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "User not found" });
        const chats = await Chat.find({ userId }).sort({ createdAt: 1 });
        return res.status(200).json({ chats });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}