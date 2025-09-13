import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String, 
            required: true
        },
        role: {
            type: String,
            enum: ["user", "ai"],
            required: true
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;