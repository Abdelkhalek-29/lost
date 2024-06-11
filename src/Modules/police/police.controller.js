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
  const users = await userModel.find({ role: "dar" }).select("name");
  if (!users) {
    return res.json({ message: "Dars not found !" });
  }

  return res.json({ success: true, results: users });
});

export const addDeathCase = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { cemeteryLocation } = req.body;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  post.cemeteryLocation = cemeteryLocation;
  // Save the updated post
  await post.save();
  return res.json({ success: true, cemeteryLocation: post.cemeteryLocation });
});

export const addConnectedCase=asyncHandler(async(req,res,next)=>{
  const{postId}=req.params;

  const post=await postModel.findById(postId)
  if(!post) {
    return res.status(404).json({error:"post not found"})
  }
  post.isClosed=true;
  await post.save()

  return res.json({success:true,connected:post.isClosed})
})