const express = require("express");
const logger = require("morgan");
const config = require("config-tiny");
const path = require("path");

// Other middlewares can live inside this directory, imported here, then included inside of the middlewares array => Installs a new middleware!

const middlewares = [
  //helmet(),
  logger(config.get("env")),
  express.json({ limit: "10mb" }),
  express.urlencoded({ extended: false }),
  express.static(path.join(__dirname, "..", "public")),
];

const init = (app) => {
  for (let middleware in middlewares) app.use(middlewares[middleware]);
};

module.exports = init;
