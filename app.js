"use strict";

/**
 * Bootstraps the express server loading all hooks, routes and middlewares
 */

const express = require("express");
const initRoutes = require("./routes");
const initializeMiddlewares = require("./middlewares");

const app = express();

// Initialize global middlewares
initializeMiddlewares(app);

// Initialize application routes
initRoutes(app);

module.exports = app;
