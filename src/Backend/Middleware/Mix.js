const multer = require("multer"); 
const path = require("path");



const mixStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "thumbnail") {
        cb(null, path.join(__dirname, "../../../public/MixUploads/Thumbnail"));
      } else if (file.fieldname === "track") {
        cb(null, path.join(__dirname, "../../../public/MixUploads/Tracks"));
      } else {
        // Handle other file uploads if needed
        cb(new Error("Invalid fieldname"), null);
      }
    },
    filename: (req, file, cb) => {
      const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, uniquePrefix + extension);
    },
  });
  
  exports.mixUpload = multer({ storage: mixStorage }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "track", maxCount: 1 },
    // Add more fields if needed for other file uploads
  ]);