import { Router } from "express";
import { allPosrInDar, darProfile, info } from "./dar.controller.js";
import { isAuthenticated } from "../../Middleware/authentication.middleware.js";
import { isAuthorized } from "../../Middleware/authorizaion.middleware.js";
import { allPosts } from "../posts/post.controller.js";
import * as profileController from "../userProfile/userprofile.controller.js";
import { fileUpload, filterObject } from "../../utils/multer.js";


const router=Router()


router.get("/allpostindar" , isAuthenticated , isAuthorized("dar") , allPosrInDar)
router.get("/allpost" , isAuthenticated , isAuthorized("dar") , allPosts)
router.get("/profile/:address",isAuthenticated,isAuthorized('user','admin','police','dar'),darProfile)

// profile info
router.get("/profileinfo",isAuthenticated,isAuthorized("dar"),info)

router.put(
    "/updateProfileImage",
    isAuthenticated,
    isAuthorized("dar"),
    fileUpload(filterObject.image).single("imageProfile"),
    profileController.updateProfileImage
  );

  // update Cover Profile
router.put(
  "/updateCoverProfile",
  isAuthenticated,
  isAuthorized("dar"),
  fileUpload(filterObject.image).single("updateCoverProfile"),
  profileController.updateCoverProfile
);

export default router