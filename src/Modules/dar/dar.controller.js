import { asyncHandler } from "../../utils/errorHandling.js";

import { postModel } from "../../../DB/models/post.model.js";
import { imageModel } from "../../../DB/models/image.mode.js";
import { userModel } from "../../../DB/models/user.model.js";

// all post in dar
export const allPosrInDar = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const allPosts = await postModel.find({ address: req.user.name });
  const postsWithImages = await Promise.all(
    allPosts.map(async (post) => {
      const image = await imageModel
        .findById(post.imageId)
        .select("images.url");
      const user = await userModel
        .findById(post.createdBy)
        .select("name profileImage");
      return { ...post.toObject(), image, user };
    })
  );

  return res.json({ success: true, results: postsWithImages, user });
});

export const darProfile = asyncHandler(async (req, res, next) => {
  const { address } = req.params;

  const user = await userModel.findOne({ name: address });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const posts = await postModel.find({ address }).populate({
    path: "imageId",
    select: "images.url",
  });
  if (!posts) {
    return res.json("Profile not found");
  }

  return res.json({ success: true, results: posts, user });
});


