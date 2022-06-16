const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const addTask = require("../../services/api/addTask");

const router = express.Router();

router.all("/add_task", [body("data.group", "group is required").exists(), body("data.task", "task is required").isArray().withMessage("task is not Array"), checkErrors, addTask]);

module.exports = router;