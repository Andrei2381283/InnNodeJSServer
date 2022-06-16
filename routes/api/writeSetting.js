const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const writeSetting = require("../../services/api/writeSetting");

const router = express.Router();

router.all("/write_setting", [body("data.group", "group is required").exists(), body("data.name_setting", "name_setting is required").exists(), body("data.setting", "setting is required").isObject().withMessage("setting is not JSON"), checkErrors, writeSetting]);

module.exports = router;