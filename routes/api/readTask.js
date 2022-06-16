const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const readTask = require("../../services/api/readTask");

const router = express.Router();

router.all("/read_task", [body("data.group", "group is required").exists(), checkErrors, readTask]);

module.exports = router;