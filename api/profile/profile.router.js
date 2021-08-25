const router = require("express").Router();
const {
    find,
    create
} = require("./profile.controller");
const multer = require("multer");
const path = require("path");
const AppError = require("./../../utils/appError");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
}).single("profile_picture");

router.get("/", find);
router.post("/", upload, create);


module.exports = router;