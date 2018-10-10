require("dotenv-extended").load();

const next = require("next");
const nextAuth = require("next-auth");
const nextAuthConfig = require("./next-auth.config");
const api = require("./api");

const nextApp = next({
  dir: ".",
  dev: process.env.NODE_ENV === "development",
});

nextApp
  .prepare()
  .then(() => nextAuthConfig())
  .then(nextAuthOptions =>
    nextAuth(nextApp, {
      ...nextAuthOptions,
      port: undefined,
    }),
  )
  .then(
    ({ expressApp: app }) =>
      new Promise((resolve, reject) => {
        app.use("/api", api);

        app.all("*", (req, res) => {
          let nextRequestHandler = nextApp.getRequestHandler();
          return nextRequestHandler(req, res);
        });

        app.listen(process.env.PORT, err => {
          if (err) return reject(err);
          resolve();
        });
      }),
  )
  .then(() => {
    console.log(`> ${process.env.SERVER_URL}`);
  })
  .catch(err => console.error("Error starting server", err));
