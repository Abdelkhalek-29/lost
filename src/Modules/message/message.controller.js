import { Message } from "../../../DB/models/message.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { receiverId, content } = req.body;

  if (!senderId || !content) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const newMessage = await Message.create({ senderId, receiverId, content });
    res.json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Endpoint to retrieve all messages (for demonstration)
export const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: "asc" }).exec();
    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});
