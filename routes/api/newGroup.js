const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const newGroup = require("../../services/api/newGroup");

const router = express.Router();

router.all("/new_group", [body("data.group", "group is required").exists(), checkErrors, newGroup]);

module.exports = router;