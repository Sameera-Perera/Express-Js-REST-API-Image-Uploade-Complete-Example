require("dotenv").config();
const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const profiles = require("./api/profile/profile.router");
const vehicles = require("./api/vehicle/vehicle.router");
const gallery = require("./api/gallery/gallery.router");

app.use(express.json());
app.use('/upload', express.static('upload/images'));
app.use("/api/profiles", profiles);
app.use("/api/vehicles", vehicles);
app.use("/api/galleries", gallery);

app.all('*', (req, res, next) => {
    throw new AppError(`Requested URL ${req.path} not found!`, 404);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});