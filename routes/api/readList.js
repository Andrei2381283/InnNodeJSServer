const express = require("express");
const checkErrors = require("../../middleware/checkErrors");

const readList = require("../../services/api/readList");

const router = express.Router();

router.all("/read_list", [checkErrors, readList]);

module.exports = router;