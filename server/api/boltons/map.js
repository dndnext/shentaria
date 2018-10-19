const { Router } = require("express");
const { walk } = require("walk");
const Model = require("../models/map");

const router = new Router();

router.get("/:id/tiles", async (req, res) => {
  const { id } = req.params;
  try {
    const info = await getTileInfo(id);
    res.send(info);
  } catch (e) {
    res.status(500).send({ err: e.message });
  }
});

router.get("/:id/full", async (req, res) => {
  const { id } = req.params;
  const info = await Promise.all([getTileInfo(id), Model.findById(id)]);
  res.send({ tiles: info[0], map: info[1] });
});

const getTileInfo = id =>
  new Promise((resolve, reject) => {
    const w = walk(__dirname + "/../../../static/tiles/" + id);
    const tiles = [];
    const layers = {};
    w.on("file", (root, fileStats, next) => {
      const parts = root.split("/");
      const x = parts.pop();
      const z = parts.pop();
      const fileParts = fileStats.name.split(".");
      const y = fileParts[0];
      const ext = fileParts.pop();
      tiles.push({
        url: `/static/tiles/${id}/${z}/${x}/${y}.${ext}`,
        x,
        y,
        z,
      });
      layers[z] = layers[z] || {};
      layers[z][x] = layers[z][x] || {};
      layers[z][x][y] = `/static/tiles/${id}/${z}/${x}/${y}.${ext}`;
      next();
    });
    w.on("end", () => {
      resolve({ tiles, layers });
    });
    w.on("error", reject);
  });

module.exports = router;
