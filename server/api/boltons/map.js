const { Router } = require("express");

const router = new Router();

router.get("/test", (_, res) => {
  res.send({ test: 123 });
});

module.exports = router;
