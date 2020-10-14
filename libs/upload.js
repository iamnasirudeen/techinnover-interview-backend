const multer = require("multer");
const { extname } = require("path");
const responseHandler = require("../utils");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${extname(file.originalname)}`);
  },
});

function fileFilter(req, file, cb) {
  let fileLimit = 1000000; //1MB
  if (!file) {
    cb(new Error("Pls upload a photograph", 400), false);
  }

  if (file.mimetype.startsWith("image")) {
    if (file.size > fileLimit) cb(new Error("File is too large", 400), false);
    else cb(null, true);
  } else {
    cb(new Error("File is not an image!", 400), false);
  }
}

const upload = multer({ storage, fileFilter }).single("photograph");

function uploadFile(req, res, next) {
  upload(req, res, (err) => {
    if (err)
      return responseHandler(res, 400, "Error", "Multer error", err.message);

    if (!err) return next();
  });
}

module.exports = uploadFile;
