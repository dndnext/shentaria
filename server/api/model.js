const { Router } = require("express");

function createModelApi(Model, boltOnRouter) {
  const router = new Router();

  router.get("/", async (_, res) => {
    const result = await Model.find();
    res.send(result);
  });

  router.post("/", async (req, res) => {
    const m = new Model(req.body);
    const result = await m.save();
    res.send(result);
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const m = await Model.findByIdAndUpdate(id);
    m.set(req.body);
    const result = await m.save();
    res.send(result);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const m = await Model.findById(id);
    if (!m) return res.status(400).send({ err: "Entity does not exist" });
    const result = await m.remove();
    res.send(result);
  });

  if (!!boltOnRouter) {
    console.log("trying to use", !!boltOnRouter, boltOnRouter);
    router.use("/", boltOnRouter);
  }

  return router;
}

module.exports = createModelApi;
