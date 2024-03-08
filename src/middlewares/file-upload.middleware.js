import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName =
      new Date().toISOString().replace(/:/g, "_") +'-'+file.originalname;
    cb(null,fileName);
  },
});


export const uploadFile = multer({
    storage:storage
});
