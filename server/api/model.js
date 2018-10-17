const { Router } = require("express");
const { apiRequireUser } = require("./middleware");

function createModelApi(Model, boltOnRouter) {
  const router = new Router();

  if (boltOnRouter) router.use("/", boltOnRouter);

  router.get("/", async (_, res) => {
    const result = await Model.find();
    res.send(result);
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const m = await Model.findById(id);
    res.send(m);
  });

  router.post("/", apiRequireUser, async (req, res) => {
    let user = req.session.passport.user;
    const m = new Model({ ...req.body, createdBy: user });
    const result = await m.save();
    res.send(result);
  });

  router.put("/:id", apiRequireUser, async (req, res) => {
    const { id } = req.params;
    const m = await Model.findByIdAndUpdate(id);
    m.set(req.body);
    const result = await m.save();
    res.send(result);
  });

  router.delete("/:id", apiRequireUser, async (req, res) => {
    const { id } = req.params;
    const m = await Model.findById(id);
    if (!m) return res.status(400).send({ err: "Entity does not exist" });
    const result = await m.remove();
    res.send(result);
  });

  return router;
}

module.exports = createModelApi;
