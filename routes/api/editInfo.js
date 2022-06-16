const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const editInfo = require("../../services/api/editInfo");

const router = express.Router();

router.all("/edit_info", [body("data.inn", "inn is required").exists(), checkErrors, editInfo]);

module.exports = router;