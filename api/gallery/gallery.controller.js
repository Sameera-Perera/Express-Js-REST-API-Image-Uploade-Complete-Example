const {
    find,
    create
} = require("./gallery.service");

module.exports = {
    find: async(req, res) => {
        try {
            const result = await find();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    create: async(req, res) => {
        try {
            var gallery = req.body;
            var gallery_image = req.files;

            const result = await create(gallery, gallery_image);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
};