import Joi from "joi";

const nameRegex = /^[a-zA-Z\s'-]+$/;
const nationalIdRegex = /^(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d{5}$/;
const emailRegex= /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex=  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

// sign up
export const signupSchema =Joi.object({
    name: Joi.string().min(3).max(20).regex(nameRegex).required(),
    nId:Joi.string().regex(nationalIdRegex).required(),
    email: Joi.string().email().regex(emailRegex).required(),
    password: Joi.string().min(8).max(16).regex(passwordRegex).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).required(),
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
    password:Joi.string().regex(passwordRegex).required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
}).required()


