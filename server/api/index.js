const { Router } = require("express");
const uploadApi = require("./upload");

const router = new Router();
router.use("/upload", uploadApi);

module.exports = router;
