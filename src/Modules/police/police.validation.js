import joi from "joi";
import { isValidObjectId } from "../../Middleware/validation.middleware.js";

export const updateLocationSchema=joi.object({
    postId:joi.string().custom(isValidObjectId).required(),
    address:joi.string().required()

}).required()

export const deathcase = joi.object({
    cemeteryLocation:joi.string().required(),
    postId: joi.string().custom(isValidObjectId).required(),
  }).required();