import { postModel } from "../../../DB/models/post.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const updateLocation = asyncHandler(async (req, res, next) => {
    const { postId  } = req.params;
  
    const post = await postModel.findById(postId).populate([{
      path:"imageId",
      select:"images.url"
    },
    {
      path:"createdBy",
      select:"name profileImage.url"
    }
]);
    if (!post) return next(new Error("Post Not Exist"));
  
    post.address = req.body.darName;
    await post.save();
    return res.json({ success: true, results: post });
  });
