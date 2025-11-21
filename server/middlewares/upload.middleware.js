import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedFilesType = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
  ];
  if (allowedFilesType.includes(file.minetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
