import multer from "multer";

// Multer for storing the user images on the uploads folder locally
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/avatars");
  },
  filename: function (req, file, cb) {
    const fileName =
      new Date().toISOString().replace(/:/g, "_") + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const uploadFile = multer({
  storage: storage,
});
