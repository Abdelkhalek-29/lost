import { Router } from "express";
import { allPosrInDar, darProfile } from "./dar.controller.js";
import { isAuthenticated } from "../../Middleware/authentication.middleware.js";
import { isAuthorized } from "../../Middleware/authorizaion.middleware.js";
import { allPosts } from "../posts/post.controller.js";
import * as profileController from "../userProfile/userprofile.controller.js";
import { fileUpload, filterObject } from "../../utils/multer.js";


const router=Router()


router.get("/allpostindar" , isAuthenticated , isAuthorized("dar") , allPosrInDar)
router.get("/allpost" , isAuthenticated , isAuthorized("dar") , allPosts)
router.get("/profile/:address",isAuthenticated,isAuthorized('user','admin','police','dar'),darProfile)


router.put(
    "/updateProfileImage",
    isAuthenticated,
    isAuthorized("dar"),
    fileUpload(filterObject.image).single("imageProfile"),
    profileController.updateProfileImage
  );


export default router