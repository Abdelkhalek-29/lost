import { postModel } from "../../../DB/models/post.model.js";
import { userModel } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const updateLocation = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const post = await postModel.findById(postId).populate([
    {
      path: "imageId",
      select: "images.url",
    },
    {
      path: "createdBy",
      select: "name profileImage.url",
    },
  ]);
  if (!post) return next(new Error("Post Not Exist"));

  post.address = req.body.address;
  await post.save();
  return res.json({ success: true, results: post });
});

export const getAllDar = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({ role: "dar" }).select('name')
  if (!users) {
    return res.json({ message: "Dars not found !" });
  }

  return res.json({ success: true, results:users});
});
