const multer = require("multer");
const path = require("path");

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "coverImage"){
            cb(null, path.join(__dirname, "../../../public/Profile/CoverImage"));
        } else if (file.fieldname === "profilePic") {
            cb(null, path.join(__dirname, "../../../public/Profile/ProfilePic"))
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


exports.profileUploads = multer({ storage: profileStorage}).fields([
    { name: "coverImage", maxCount: 1 },
    { name: "profilePic", maxCount: 1},
]);