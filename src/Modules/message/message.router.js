import { Router } from "express";
import { getMessages, sendMessage } from "./message.controller.js";
import { isAuthenticated } from "../../Middleware/authentication.middleware.js";

const router = Router();

router.post('/send-message',isAuthenticated ,sendMessage)

router.get("/messages",isAuthenticated, getMessages)

export default router;
