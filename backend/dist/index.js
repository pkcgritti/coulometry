"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db");
// import Repositories from './repositories'
const router = express.Router()
    .get('/', (_, res) => res.send('Online'));
const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
    extended: true
}))
    .use(cors({
    origin: true
}))
    .use('/', router)
    .listen(8080, function () {
    console.log('Listening on port 8000');
});
exports.app = app;
//# sourceMappingURL=index.js.map