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
  encyclopediaentry: require("./models/encyclopediaEntry"),
};

mongoose.connect(process.env.MONGO_URI);

const router = new Router();

router.use("/upload", uploadApi);

const test = new Router();

test.get("/test", (_, res) => {
  res.send({ test: 123 });
});

Object.entries(models).forEach(([path, model]) => {
  router.use(`/${path}`, createModelApi(model, path === "map" ? test : null));
});

module.exports = router;
