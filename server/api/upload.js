const { Router } = require("express");
const multer = require("multer");
const mkdirp = require("mkdirp");

const mkdir = path =>
  new Promise((resolve, reject) => {
    const dir = `${__dirname}/../../${path}`;
    mkdirp(dir, err => {
      if (err) return reject(err);
      resolve(dir);
    });
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { mapName, z } = req.params;
    const [_, x, y] = file.originalname.split(".")[0].split("-");
    const dir = `static/tiles/${mapName}/${z}/${y}/${x}`;
    mkdir(dir).then(madeDir => cb(null, madeDir), cb);
  },
  filename: (req, file, cb) => {
    cb(null, "tile.png");
  },
});
const upload = multer({ storage });

const router = new Router();

router.post("/:mapName/:z", upload.array("tiles", 100), (req, res) => {
  console.log(req.files);
  res.send({ ok: 1 });
});

module.exports = router;
