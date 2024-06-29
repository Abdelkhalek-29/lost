import mongoose, { Schema, model } from "mongoose";

// Message Schema
const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  });

export const Message = mongoose.model.Message || model("Message", messageSchema);
