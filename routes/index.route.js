const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const upload = require("../libs/upload");

router.post("/user/create", upload, controller.createUser);
router.get("/users", controller.getAllUsers);
router.get("/user/:email", controller.getUserDataByEmail);

module.exports = router;
