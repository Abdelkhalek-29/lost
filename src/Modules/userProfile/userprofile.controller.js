import { userModel } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../../utils/cloud.js";
import { reportModel } from "../../../DB/models/report.model.js";

// Update Profile
export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nId: req.body.nId,
      email: req.body.email,
      Location:req.body.Location,
      gender: req.body.gender,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!user) return next(new Error("user not found !"));

  return res.json({ success: true, result: user });
});

// update profile image
export const updateProfileImage = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) return next(new Error("user not found !"));

  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: user.profileImage.id,
      }
    );

    user.profileImage.url = secure_url;
    user.profileImage.id = public_id;
  }

  await user.save();
  return res.json({ success: true, result: user });
});

// update cover image
export const updateCoverProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) return next(new Error("user not found !"));

  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        public_id: user.coverImages.id,
      }
    );

    user.coverImages.url = secure_url;
    user.coverImages.id = public_id;
  }

  await user.save();
  return res.json({ success: true, result: user });
});

// Change Password
export const changePassword = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) return next(new Error("user not found !"));

  const match = bcryptjs.compareSync(req.body.oldPassword, user.password);

  if (!match) return res.json({ message: "oldPassword is worng" });
  const hashPassword = bcryptjs.hashSync(
    req.body.newPassword,
    Number(process.env.SALT_ROUND)
  );

  user.password = hashPassword;
  await user.save();

  return res.json({ success: true, result: user });
});



