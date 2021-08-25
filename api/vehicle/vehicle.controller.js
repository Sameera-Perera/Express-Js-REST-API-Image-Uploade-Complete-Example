const {
    find,
    create
} = require("./vehicle.service");

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
            var data = req.body;
            if (req.files["image_1"])
                data["image_1"] = req.files["image_1"][0].filename;

            if (req.files["image_2"])
                data["image_2"] = req.files["image_2"][0].filename;

            const result = await create(data);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
};