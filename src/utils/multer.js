import multer, { diskStorage } from "multer";

export const filterObject = {
  image: ["image/png", "image/jpg", "image/jpeg"],
  pdf: ["application/pdf"],
};

export const fileUpload = (filterArray) => {
  const fileFilter = (req, file, cb) => {
    console.log('File mimetype:', file.mimetype);
    if (!filterArray.includes(file.mimetype)) {
      return cb(new Error("Invalid file format!"), false);
    }
    return cb(null, true);
  };

  return multer({
    storage: diskStorage({}),
    fileFilter,
  });
};
