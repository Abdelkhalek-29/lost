import { imageModel } from "../../../DB/models/image.mode.js";
import { postModel } from "../../../DB/models/post.model.js";
import { compare_faces } from "../../utils/cosine_similarity.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const matchImage = asyncHandler(async (req, res, next) => {
    // Fetch the latest post created by the user
    const userPosts = await postModel.find({ createdBy: req.user._id });
    if (userPosts.length === 0) {
        return res.status(404).json({ message: "No posts found for the user" });
    }

    const latestPostDoc = userPosts[userPosts.length - 1];
    const typePost = latestPostDoc.type === "Lost" ? "Found" : "Lost";

    // Fetch all images related to the user's latest post
    const latestImagesDoc = await imageModel.findOne({ postId: latestPostDoc._id });
    if (!latestImagesDoc || !latestImagesDoc.images || latestImagesDoc.images.length === 0) {
        return res.status(404).json({ message: "No images found for the user's latest post" });
    }

    const latestImages = latestImagesDoc.images.map(img => img.url);

    // Fetch all posts of the opposite type
    const oppositePosts = await postModel.find({ type: typePost });
    if (oppositePosts.length === 0) {
        return res.status(404).json({ message: `No ${typePost.toLowerCase()} posts found` });
    }

    // Extract IDs of opposite type posts
    const oppositePostIds = oppositePosts.map(post => post._id);

    // Fetch all images related to the opposite type posts
    const allOppositeImages = await imageModel.find({ postId: { $in: oppositePostIds } });

    for (let i = 0; i < allOppositeImages.length; i++) {
        if (!allOppositeImages[i].images || allOppositeImages[i].images.length === 0) continue;

        for (let img of allOppositeImages[i].images) {
            for (let latestImg of latestImages) {
                const resultMatch = await compare_faces(latestImg, img.url);

                // Log the result to understand its format
                console.log("Result Match:", resultMatch);

                // Check if resultMatch is an object and extract the message if necessary
                const matchMessage = typeof resultMatch === "object" ? resultMatch.result : resultMatch;

                if (typeof matchMessage === "string" && matchMessage.includes("Same person")) {
                    // Fetch the posts related to the matching images and populate images
                    const post1 = await postModel.findOne({ _id: latestImagesDoc.postId }).populate('imageId');
                    const post2 = await postModel.findOne({ _id: allOppositeImages[i].postId }).populate('imageId');

                    return res.json({
                        message: "match",
                        posts: [post1, post2]
                    });
                }
            }
        }
    }

    return res.json({ message: "Not-Match" });
});
