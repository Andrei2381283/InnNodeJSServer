const express = require("express");
const { body } = require("express-validator");

const useMiddlewareForRoutes = require("../utils/useMiddlewareForRoutes");

const checkErrors = require("../middleware/checkErrors");
const checkAdmin = require("../middleware/checkAdmin");
const checkApi = require("../middleware/checkApi");

const router = express.Router();

router.use([
    body("command", "command required").exists(),
    body("data", "data required").exists(),
    checkErrors,
    (req, res, next) => {
        req.url = req.originalUrl = req._parsedUrl.pathname = req._parsedUrl.path = req._parsedUrl.href = req._parsedUrl._raw = "/" + req.body.command;
        next();
    },
    useMiddlewareForRoutes([body("api_key", "api_key is required").exists(), checkErrors, checkApi],[
        require("./api/newGroup"),
        require("./api/addTask"),
        require("./api/readTask"),
        require("./api/writeSetting"),
        require("./api/readSettings"),
        require("./api/readList"),
        require("./api/editInfo"),
        require("./api/editInfo")
    ]),

    useMiddlewareForRoutes([body("admin_key", "admin_key is required").exists(), checkErrors, checkAdmin],[
        require("./admin/newApiKey"),
        require("./admin/dellName")
    ])
])

module.exports = router;