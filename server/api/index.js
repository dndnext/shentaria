require("dotenv-extended").load();
const { Router } = require("express");
const mongoose = require("mongoose");
const uploadApi = require("./upload");
const createModelApi = require("./model");
const models = {
  map: require("./models/map"),
  icon: require("./models/icon"),
  campaign: require("./models/campaign"),
  encyclopedia: require("./models/encyclopedia"),
};
const boltons = {
  encyclopedia: require("./boltons/encyclopedia"),
  map: require("./boltons/map"),
};

mongoose.connect(process.env.MONGO_URI);

const router = new Router();

router.use("/upload", uploadApi);

Object.entries(models).forEach(([path, model]) => {
  router.use(`/${path}`, createModelApi(model, boltons[path]));
});

module.exports = router;
