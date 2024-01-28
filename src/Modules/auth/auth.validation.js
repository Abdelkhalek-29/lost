import Joi from "joi";

// sign up
export const signupSchema =Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    nId:Joi.number().required(),
    Location:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).required(),
    gender:Joi.string().required(),
    phone:Joi.string().required(),
}).required()

// Active account
export const activateSchema=Joi.object({
    activationCode:Joi.string().required()
}).required()

// Login
export const loginSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).required()

// Forget code
export const forgetCodeSchema =Joi.object({
    email:Joi.string().email().required()
}).required()

// Reset pass
export const resetPasswordSchema = Joi.object({
    email:Joi.string().email().required(),
    forgetCode: Joi.string().required(),
    password:Joi.string().required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
}).required()


