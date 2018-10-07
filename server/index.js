require("dotenv-extended").load();

const next = require("next");
const nextAuth = require("next-auth");
const nextAuthConfig = require("./next-auth.config");

const nextApp = next({
  dir: ".",
  dev: process.env.NODE_ENV === "development",
});

nextApp
  .prepare()
  .then(() => nextAuthConfig())
  .then(nextAuthOptions => nextAuth(nextApp, nextAuthOptions))
  .then(response => console.log(`${process.env.SERVER_URL}`))
  .catch(err => console.error("Error starting server", err));
