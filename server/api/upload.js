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
  destination: (req, _, cb) => {
    const { mapName, z, x } = req.params;
    const dir = `static/tiles/${mapName}/${z}/${x}`;
    mkdir(dir).then(madeDir => cb(null, madeDir), cb);
  },
  filename: (req, _, cb) => {
    const { y } = req.params;
    cb(null, `${y}.png`);
  },
});
const upload = multer({ storage });

const router = new Router();

router.post("/:mapName/:z/:x/:y", upload.single("tile", 10), (req, res) => {
  const { mapName, z, x, y } = req.params;
  res.send({
    path: `/static/tiles/${mapName}/${z}/${x}/${y}.png`,
    map: mapName,
    x,
    y,
    z,
  });
});

module.exports = router;
