const fs = require("fs");

const getRoutes = (app) => {
  let routes = fs.readdirSync(__dirname, { encoding: "utf-8" });
  routes.splice(routes.indexOf("index.js"), 1); // exclude index.js from the route to be used by app
  for (route in routes) app.use(require("./".concat(routes[route])));
};

module.exports = getRoutes;
