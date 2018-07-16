"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const config_1 = require("./config");
const messager_1 = require("./middlewares/messager");
require("./db");
const controllers_1 = require("./controllers");
const router = express.Router()
    .get('/', (_, res) => res.send('Online'));
const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
    extended: true,
}))
    .use(fileUpload())
    .use(cors({
    origin: true,
}))
    .use(express.static('public'))
    .use(messager_1.default())
    .use('/dataset', controllers_1.default.Dataset.buildRouter())
    .use('/material', controllers_1.default.Material.buildRouter())
    .use('/', router)
    .listen(config_1.default.express.port, function () {
    console.log('Listening on port ' + config_1.default.express.port);
});
exports.app = app;
//# sourceMappingURL=index.js.map