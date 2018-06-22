"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataset_1 = require("./dataset");
const db_1 = require("../db");
exports.default = {
    Dataset: new dataset_1.DatasetRepository(db_1.default)
};
//# sourceMappingURL=index.js.map