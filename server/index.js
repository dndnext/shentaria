require("dotenv-extended").load();
const qs = require("querystring");
const next = require("next");
const nextAuth = require("next-auth");
const nextAuthConfig = require("./next-auth.config");
const api = require("./api");

const DEV = process.env.NODE_ENV === "development";

const nextApp = next({
  dir: ".",
  dev: DEV,
});

function handleWithParam(app, method, handler, path, page) {
  return app[method](path, (req, res) => {
    const newQuery = qs.stringify({ ...req.query, ...req.params });
    req.url = `${page}?${newQuery}`;
    return handler(req, res, req.url);
  });
}

nextApp
  .prepare()
  .then(() => nextAuthConfig())
  .then(nextAuthOptions =>
    nextAuth(nextApp, {
      ...nextAuthOptions,
      csrf: !DEV,
      port: undefined,
    }),
  )
  .then(
    ({ expressApp: app }) =>
      new Promise((resolve, reject) => {
        app.use("/api", api);

        const handler = nextApp.getRequestHandler();

        handleWithParam(app, "get", handler, "/map/editor/:id", "/map/editor");
        handleWithParam(app, "get", handler, "/map/:id", "/map/view");
        handleWithParam(app, "get", handler, "/campaign/:id", "/campaign/view");
        handleWithParam(
          app,
          "get",
          handler,
          "/encyclopedia/entry/:id",
          "/encyclopedia/view/entry",
        );
        handleWithParam(
          app,
          "get",
          handler,
          "/encyclopedia/:id/new",
          "/new/encyclopedia/entry",
        );
        handleWithParam(
          app,
          "get",
          handler,
          "/encyclopedia/:id",
          "/encyclopedia/view",
        );

        app.all("*", handler);

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
