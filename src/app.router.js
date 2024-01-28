import authRouter from "./Modules/auth/auth.router.js";
import postRouter from "./Modules/posts/post.router.js";
import adminRouter from "./Modules/admin/admin.router.js"
import userprofileRouter from "./Modules/userProfile/userprofile.router.js"
import { globalErrorHandling } from "./utils/errorHandling.js";

export const appRouter = (app, express) => {
  app.use(express.json());

  // Auth
  app.use("/auth", authRouter);

  //Post
  app.use("/post", postRouter);

  // User Profile
  app.use("/userprofile",userprofileRouter)

  // Admin
  app.use("/admin",adminRouter)

  app.use("*", (req, res, next) => {
    return res.json({ Message: "In-valid routing" });
  });

  app.use(globalErrorHandling);
};
