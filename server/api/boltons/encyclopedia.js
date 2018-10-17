const { Router } = require("express");
const EntryModel = require("../models/encyclopediaEntry");
const createModelApi = require("../model");

const router = new Router();

router.get("/:encyclopedia/entries", async (req, res) => {
  const { encyclopedia } = req.params;
  const entries = await EntryModel.find({ encyclopedia });
  res.send(entries);
});

router.use(`/entry`, createModelApi(EntryModel));

module.exports = router;
