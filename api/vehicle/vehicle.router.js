const router = require("express").Router();
const {
    find,
    create
} = require("./vehicle.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
}).fields([{
    name: 'image_1',
    maxCount: 1
}, {
    name: 'image_2',
    maxCount: 1
}]);


router.get("/", find);
router.post("/", upload, create);


module.exports = router;