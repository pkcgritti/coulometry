"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataset_1 = require("./dataset");
const material_1 = require("./material");
const element_1 = require("./element");
const db_1 = require("../db");
exports.default = {
    Dataset: new dataset_1.DatasetRepository(db_1.default),
    Material: new material_1.MaterialRepository(db_1.default),
    Element: new element_1.ElementRepository(db_1.default)
};
//# sourceMappingURL=index.js.map