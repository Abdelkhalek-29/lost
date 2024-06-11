import { Router } from "express";
import { isAuthenticated } from "../../Middleware/authentication.middleware.js";
import { isAuthorized } from "../../Middleware/authorizaion.middleware.js";
import { allPosts } from "../posts/post.controller.js";
import {
  addConnectedCase,
  addDeathCase,
  getAllDar,
  updateLocation,
} from "./police.controller.js";
import { connectedCase, deathcase, updateLocationSchema } from "./police.validation.js";
import { isValid } from "../../Middleware/validation.middleware.js";

const router = Router();

router.get("/allpost", isAuthenticated, isAuthorized("police"), allPosts);

router.post(
  "/changelocation/:postId",
  isAuthenticated,
  isAuthorized("police"),
  isValid(updateLocationSchema),
  updateLocation
);

router.get("/alldar", isAuthenticated, isAuthorized("police"), getAllDar);

// Add death case
router.post(
  "/death/:postId",
  isAuthenticated,
  isAuthorized("police"),
  isValid(deathcase),
  addDeathCase
);

// Add connected case
router.post(
  "/connected/:postId",
  isAuthenticated,
  isAuthorized("police"),
  isValid(connectedCase),
  addConnectedCase
);
export default router;
