import joi from "joi";


export const loginDarSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).max(16).required(),

}).required()
