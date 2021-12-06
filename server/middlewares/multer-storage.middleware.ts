import multer from "multer";
import { Request } from "express";
import FileUploadException from "../exceptions/file-upload.exception";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const ROOT_PATH = path.join(__dirname, "../temp");
    if (!fs.existsSync(ROOT_PATH)) {
      fs.mkdirSync(ROOT_PATH);
    }
    if (!fs.existsSync(`${ROOT_PATH}/${file.fieldname}`)) {
      fs.mkdirSync(`${ROOT_PATH}/${file.fieldname}`, { recursive: true });
    }
    callback(null, `${ROOT_PATH}/${file.fieldname}`);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: (e: Error, b: boolean) => void
): void {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new FileUploadException(
        "Can not upload to temporary storage. Wrong file type"
      ),
      false
    );
  }
};

const uploadFn = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  fileFilter: fileFilter,
});

export default uploadFn;
