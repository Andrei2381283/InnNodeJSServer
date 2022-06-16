const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const readSettings = require("../../services/api/readSettings");

const router = express.Router();

router.all("/read_settings", [body("data.group", "group is required").exists(), checkErrors, readSettings]);

module.exports = router;