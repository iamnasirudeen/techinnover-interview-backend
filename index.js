const config = require("config-tiny");
const db = require("./database");
const app = require("./app");

db(app)
  .then(() => {
    console.log("Database connection established");
    const port = process.env.PORT || config.get("port");
    console.log("App is running on port: %s", port);
  })
  .catch((err) => console.log(err));

module.exports = app;
