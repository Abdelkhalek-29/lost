import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      min: 4,
      max: 15,
    },
    nId: {
      type: Number,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      min: 8,
      max: 16,
    },
    role: {
      type: String,
      enum: ["user", "admin", "police", "dar"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    Location: {
      type: String,
    },
    forgetCode: String,
    activationCode: String,

    profileImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dtykqby6b/image/upload/v1719540480/defualt/t0yelif4jla7lovmev3s.jpg",
      },
      id: {
        type: String,
        default: "defualt/t0yelif4jla7lovmev3s",
      },
    },

    coverImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dtykqby6b/image/upload/v1719540808/defualt/xkvhsagzcfg57wchk7yk.jpg",
      },
      id: {
        type: String,
        default: "defualt/xkvhsagzcfg57wchk7yk",
      },
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model.User || model("User", userSchema);
