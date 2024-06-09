import joi from "joi";
import { isValidObjectId } from "../../Middleware/validation.middleware.js";

export const updateLocationSchema=joi.object({
    postId:joi.string().custom(isValidObjectId).required(),
    darName:joi.string().required()

}).required()