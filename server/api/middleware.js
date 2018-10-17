function apiRequireUser(req, res, next) {
  try {
    const user = req.session.passport.user;
    if (user) return next();
    return res.status(400).send({ err: "Requires user" });
  } catch (_) {
    return res.status(400).send({ err: "Requires user" });
  }
}

module.exports = { apiRequireUser };
